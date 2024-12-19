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

        if ($wachtlijst) {
            $addedAt = Carbon::parse($wachtlijst->added_at);
            $now = Carbon::now();

            $targetDate = $addedAt->copy()->addMonths(3);

            $diff = $now->diff($targetDate);

            $remainingMonths = $diff->m;
            $remainingDays = $diff->d;
        }

        return Inertia::render('Afspraken&WachtlijstPage', [
            'inWachtlijst' => $wachtlijst ? true : false,
            'wachtlijst' => $wachtlijst,
            'monthsLeft' => $wachtlijst ? $remainingMonths : null,
            'daysLeft' => $wachtlijst ? $remainingDays : null,
            'addedAt' => $wachtlijst ? $addedAt->translatedFormat('d F Y') : null,
            'targetDate' => $wachtlijst ? $targetDate->translatedFormat('d F Y') : null,
            'appointment' => $appointment,
            'csrf_token' => csrf_token(),
        ]);
    }


    public function cancelWaitlist()
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('afspraken')->with('error', 'Unauthorized access.');
        }
        Wachtlijst::where('user_id', $user->id)->delete();


        $user->update(['betaald' => false]);

        return redirect()->route('afspraken')->with('success', 'Uw afspraak is succesvol geannuleerd.');
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

    public function storeAfspraak(Request $request,TwilioService $twilio)
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
        if($user->keuze_email){
            Mail::to($user->email)->send(new AppointmentConfirmationMail($user, $appointment));
        }
        if($user->keuze_sms){
            $twilio->sendSms($user->gsm_nummer, 'Afpraak is vastgelegd op '.$appointment->datum.' om '.$appointment->tijd.' voor de behandeling: '.$appointment->behandeling);
        }

        Wachtlijst::where('user_id', $user->id)->delete();

        return redirect()->route('afspraken')->with('success', 'Uw afspraak is succesvol vastgelegd en u bent uit de wachtlijst verwijderd.');
    }
}
