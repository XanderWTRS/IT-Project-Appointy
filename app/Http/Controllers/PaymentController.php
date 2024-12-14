<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Stripe\Webhook;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use App\Models\WaitList;


class PaymentController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if(!$user){
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return inertia('PaymentForm', [
            'keuze_email' => $user->keuze_email,
            'keuze_sms' => $user->keuze_gsm,
            'csrf_token' => csrf_token(),
            'succes' => session('succes'),
            'error' => session('error'),
        ]);

    }

    public function paypositionwaitlist(Request $request)
    {
        $user = auth()->user();
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        $session = $stripe->checkout->sessions->create([
            'payment_method_types' => ['card'],
            'line_items' => [[
               'price_data' => [
                   'currency' => 'eur',
                   'product_data' => [
                       'name' => 'Voorschot',
                   ],
                   'unit_amount' => 2500,
               ],
               'quantity' => 1,
           ]],
           'mode' => 'payment',
           'success_url' => route('payment.succes', [], true),
           'cancel_url' => route('payment.cancel', [], true),
       ]);
       Transaction::create([
            'status' => 'pending',
            'user_id' => $user->id,
            'session_id' => $session->id,
            'keuze_email' => $request->input('keuze_email', false),
            'keuze_sms' => $request->input('keuze_sms', false),
            'behandeling' => $request->input('behandeling'),
            'amount' => 2500,
        ]);
        return redirect($session->url);
    }

    public function succes()
    {
        return redirect()->route('payment.index')->with('success', 'Payment successful');
    }
    public function cancel()
    {
        return redirect()->route('payment.index')->with('error', 'Payment cancelled');
    }

    public function webhook(Request $request)
    {
        $endpointSecret = env('STRIPE_WEBHOOK_SECRET');
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $endpointSecret);
        } catch (\UnexpectedValueException $e) {
            Log::error('Invalid payload', ['exception' => $e]);
            return response()->json(['error' => 'Invalid payload'], Response::HTTP_BAD_REQUEST);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error('Invalid signature', ['exception' => $e]);
            return response()->json(['error' => 'Invalid signature'], Response::HTTP_BAD_REQUEST);
        }

        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $transaction = Transaction::where('session_id', $session->id)->first();

                if ($transaction && $transaction->status === 'pending') {
                    $transaction->update(['status' => 'completed']);
                    $user = User::find($transaction->user_id);
                    $user->update([
                        'betaald' => true,
                        'keuze_email' => $transaction->keuze_email,
                        'keuze_sms' => $transaction->keuze_sms,
                    ]);
                    WaitList::create([
                        'user_id' => $user->id,
                        'added_at' => now(),
                        'behandeling' => $transaction->behandeling,
                    ]);

                }
                break;
            default:
                Log::info('Unhandled event type', ['type' => $event->type]);
        }

        return response()->json(['status' => 'success'], Response::HTTP_OK);
    }
}
