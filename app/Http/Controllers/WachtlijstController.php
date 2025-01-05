<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Wachtlijst;
use App\Models\Afspraak;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppointmentConfirmationMail;
use App\Services\TwilioService;
use App\Models\Transaction;
use Illuminate\Support\Facades\Log;

class WachtlijstController extends Controller
{
    public function wachtlijst()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $wachtlijst = Wachtlijst::where('user_id', $user->id)->first();
        $appointment = Afspraak::where('user_id', $user->id)->latest()->first();

        Carbon::setLocale('nl');

        $remainingMonths = null;
        $remainingDays = null;
        $addedAt = null;
        $targetDate = null;
        $canMakeAppointment = false;

        if ($wachtlijst) {
            $addedAt = Carbon::parse($wachtlijst->created_at)->translatedFormat('d F Y');

            // Bereken de positie in de wachtlijst
            $positie = Wachtlijst::where('created_at', '<=', $wachtlijst->created_at)
                ->orderBy('created_at', 'asc')
                ->count();

            if ($wachtlijst->allowed_to_book) {
                $canMakeAppointment = true;
            } else {
                $positieNaVrijgave = max(0, $positie - 4); // Vermijd negatieve waarden
                if ($positieNaVrijgave > 0) {
                    $wekenTotBeschikbaar = ceil($positieNaVrijgave / 4); // Vrijgave: 4 per week
                    $targetDate = Carbon::now()->startOfWeek()->addWeeks($wekenTotBeschikbaar);
                    $diff = Carbon::now()->diff($targetDate);

                    $remainingMonths = $diff->m;
                    $remainingDays = $diff->d;
                    $targetDate = $targetDate->translatedFormat('d F Y');
                } else {
                    $remainingMonths = 0;
                    $remainingDays = 0;
                }
            }
        }

        // Debugging voor controle
        Log::info('Wachtlijst debug:', [
            'positie' => $positie ?? null,
            'positieNaVrijgave' => $positieNaVrijgave ?? null,
            'wekenTotBeschikbaar' => $wekenTotBeschikbaar ?? null,
            'targetDate' => $targetDate ?? null,
            'remainingMonths' => $remainingMonths ?? null,
            'remainingDays' => $remainingDays ?? null,
        ]);

        return Inertia::render('Afspraken&WachtlijstPage', [
            'inWachtlijst' => $wachtlijst ? true : false,
            'wachtlijst' => $wachtlijst,
            'monthsLeft' => $remainingMonths,
            'daysLeft' => $remainingDays,
            'addedAt' => $addedAt,
            'targetDate' => $targetDate,
            'canMakeAppointment' => $canMakeAppointment,
            'appointment' => $appointment,
            'csrf_token' => csrf_token(),
            'hasBoete' => $user->boete,
        ]);
    }

    public function releaseUsers()
    {
        $today = Carbon::now()->locale('nl')->dayName;

        if (!in_array($today, ['dinsdag', 'donderdag'])) {
            return response()->json(['error' => 'Users can only be released on Tuesday or Thursday'], 403);
        }

        // Verwijder gebruikers die langer dan 7 dagen "allowed_to_book" zijn
        $expiredUsers = Wachtlijst::where('allowed_to_book', true)
            ->where('updated_at', '<', Carbon::now()->subDays(7))
            ->get();

        foreach ($expiredUsers as $user) {
            $user->delete();
        }

        // Selecteer de oudste 4 gebruikers die nog geen afspraak mogen maken
        $users = Wachtlijst::where('allowed_to_book', false)
            ->orderBy('created_at', 'asc')
            ->take(4)
            ->get();

        foreach ($users as $user) {
            $user->update(['allowed_to_book' => true]);
        }

        return response()->json(['success' => count($users) . ' gebruikers vrijgegeven.']);
    }

    public function testAppointment()
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('afspraken')->with('error', 'Unauthorized access.');
        }

        $wachtlijst = Wachtlijst::where('user_id', $user->id)->first();

        if (!$wachtlijst || !$wachtlijst->allowed_to_book) {
            return redirect()->route('afspraken')->with('error', 'U mag nog geen afspraak maken.');
        }

        Afspraak::create([
            'user_id' => $user->id,
            'datum' => Carbon::now()->toDateString(),
            'tijd' => '10:00',
            'behandeling' => 'Testbehandeling',
        ]);

        Wachtlijst::where('user_id', $user->id)->delete();

        return redirect()->route('afspraken')->with('success', 'Uw testafspraak is succesvol vastgelegd.');
    }

    public function cancelWaitlist()
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('afspraken')->with('error', 'Unauthorized access.');
        }

        $transaction = Transaction::where('user_id', $user->id)
            ->where('status', 'completed')
            ->latest()
            ->first();

        if ($transaction) {
            $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

            try {
                $refund = $stripe->refunds->create([
                    'payment_intent' => $transaction->payment_intent_id,
                    'amount' => $transaction->amount,
                ]);

                Log::info('Refund issued', [
                    'refund_id' => $refund->id,
                    'transaction_id' => $transaction->id,
                    'user_id' => $user->id,
                    'amount' => $transaction->amount,
                ]);

                $transaction->update(['status' => 'refunded']);
            } catch (\Stripe\Exception\ApiErrorException $e) {
                Log::error('Stripe refund failed', ['exception' => $e]);
                return redirect()->route('afspraken')->with('error', 'Er is een fout opgetreden bij het verwerken van de terugbetaling.');
            }
        } else {
            return redirect()->route('afspraken')->with('error', 'Geen voltooide transactie gevonden om terug te betalen.');
        }

        Wachtlijst::where('user_id', $user->id)->delete();
        $user->update(['betaald' => false]);

        return redirect()->route('afspraken')->with('success', 'Uw wachtlijst is geannuleerd en de betaling is terugbetaald.');
    }

    public function make()
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('afspraken')->with('error', 'Unauthorized access.');
        }

        $startDate = Carbon::now()->startOfDay();
        $endDate = Carbon::now()->addMonths(6)->endOfDay();

        $takenAppointments = Afspraak::whereBetween('datum', [$startDate->toDateString(), $endDate->toDateString()])
            ->get()
            ->groupBy('datum')
            ->map(function ($appointmentsOnDay) {
                return $appointmentsOnDay->pluck('tijd')->all();
            })
            ->toArray();

        return inertia('AfspraakPage', [
            'csrf_token' => csrf_token(),
            'appointments' => $takenAppointments,
            'current_date' => $startDate->toDateString(),
        ]);
    }

    public function storeAfspraak(Request $request, TwilioService $twilio)
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('afspraken')->with('error', 'Unauthorized access.');
        }

        $validated = $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|string',
            'treatment' => 'required|string',
        ]);

        $maxDate = Carbon::now()->addMonths(6)->toDateString();
        if ($validated['date'] > $maxDate) {
            return redirect()->route('afspraken.make')->with('error', 'U kunt geen afspraken maken meer dan 6 maanden in de toekomst.');
        }

        $existingAppointment = Afspraak::where('datum', $validated['date'])
            ->where('tijd', $validated['time'])
            ->where('behandeling', $validated['treatment'])
            ->first();

        if ($existingAppointment) {
            return redirect()->route('afspraken.make')->with('error', 'Dit tijdslot is al bezet. Kies een andere tijd.');
        }

        $appointment = Afspraak::create([
            'user_id' => $user->id,
            'datum' => $validated['date'],
            'tijd' => $validated['time'],
            'behandeling' => $validated['treatment'],
        ]);

        if ($user->keuze_email) {
            Mail::to($user->email)->send(new AppointmentConfirmationMail($user, $appointment));
        }

        if ($user->keuze_sms) {
            $twilio->sendSms($user->gsm_nummer, 'Afspraak is vastgelegd op ' . $appointment->datum . ' om ' . $appointment->tijd . ' voor de behandeling: ' . $appointment->behandeling);
        }

        Wachtlijst::where('user_id', $user->id)->delete();

        return redirect()->route('afspraken')->with('success', 'Uw afspraak is succesvol vastgelegd en u bent uit de wachtlijst verwijderd.');
    }
}
