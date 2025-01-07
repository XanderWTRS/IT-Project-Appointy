<?php

namespace App\Http\Controllers;

use App\Models\Afspraak;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Log;

class AfspraakController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search', '');

        $afspraken = Afspraak::with('user')
            ->when($search, function ($query, $search) {
                $query->where('datum', 'like', '%' . $search . '%')
                      ->orWhere('behandeling', 'like', '%' . $search . '%')
                      ->orWhereHas('user', function ($query) use ($search) {
                          $query->where('voornaam', 'like', '%' . $search . '%')
                                ->orWhere('naam', 'like', '%' . $search . '%');
                      });
            })
            ->get();

        return Inertia::render('Admin/AfsprakenPage', [
            'afspraken' => $afspraken,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }


    public function edit($id)
    {
        $afspraak = Afspraak::findOrFail($id);

        $appointments = Afspraak::all()->groupBy('datum')->map(function ($items) {
            return $items->pluck('tijd');
        });

        return Inertia::render('Admin/AfspraakEditPage', [
            'afspraak' => $afspraak,
            'csrf_token' => csrf_token(),
            'appointments' => $appointments,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required',
            'treatment' => 'required|string',
        ]);

        $afspraak = Afspraak::findOrFail($id);
        $afspraak->update([
            'datum' => $validated['date'],
            'tijd' => $validated['time'],
            'behandeling' => $validated['treatment'],
        ]);

        return redirect()->route('admin.afspraken')->with('success', 'Afspraak bijgewerkt.');
    }
    public function cancelAfspraak()
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('afspraken')->with('error', 'Unauthorized access.');
        }
        $appointment = Afspraak::where('user_id', $user->id)->latest()->first();

        if ($appointment) {
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

                    Log::info('Refund issued for canceled appointment', [
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
            }

            $appointment->delete();
            $user->update(['betaald' => false]);

            return redirect()->route('afspraken')->with('success', 'Uw afspraak is succesvol geannuleerd en de betaling is terugbetaald.');
        }

        return redirect()->route('afspraken')->with('error', 'Er is geen afspraak om te annuleren.');
    }
}
