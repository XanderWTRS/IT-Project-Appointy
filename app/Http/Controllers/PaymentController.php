<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Stripe\Webhook;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Wachtlijst;
use Illuminate\Support\Facades\Mail;
use App\Mail\PaymentSuccessMail;
use App\Services\TwilioService;


class PaymentController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if(!$user){
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if ($user->betaald) {
            return redirect()->route('afspraken')->with('success', 'U heeft al betaald. U kunt uw afspraak beheren.');
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
            'behandeling' => $request->input('treatment'),
            'amount' => 2500,
        ]);
        return redirect($session->url);
    }

    public function payFine(Request $request)
    {
        $user = auth()->user();
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        
        $session = $stripe->checkout->sessions->create([
            'payment_method_types' => ['card'],
            'line_items' => [[
            'price_data' => [
                'currency' => 'eur',
                'product_data' => [
                    'name' => 'Boete',
                ],
                'unit_amount' => 5000,
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => route('successBoete', ['id' => $user->id], true,),
        'cancel_url' => route('payment.cancel', [], true),
        ]);
        
        Transaction::create([
            'status' => 'pending',
            'user_id' => $user->id,
            'session_id' => $session->id,
            'behandeling' => null,
            'amount' => 5000,
        ]);
        
        return redirect($session->url);
    }

    public function succes()
    {
        return redirect()->route('afspraken')->with('success', 'Betaling in orde!');
    }
    public function successBoete($id)
    {
        Log::info('Boete payment success for user ID:', ['id' => $id]);
        $user = User::findOrFail($id);
        Log::info('User found:', ['user' => $user]);
        $user->boete = false;
        $user->save();
        return redirect()->route('afspraken');
    }
    public function cancel()
    {
        return redirect()->route('afspraken')->with('error', 'Betaling geannuleerd!');
    }

    public function webhook(Request $request,TwilioService $twilio)
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

                    if ($transaction->behandeling === null) {
                        $user->boete = false;
                        $user->save();
                    }

                    Wachtlijst::create([
                        'user_id' => $transaction->user_id,
                        'added_at' => now(),
                        'behandeling' => $transaction->behandeling,
                    ]);
                    if($transaction->keuze_email){
                        Mail::to($user->email)->send(new PaymentSuccessMail($user, $transaction));
                    }
                    if($transaction->keuze_sms){
                        $twilio->sendSms($user->gsm_nummer, 'Appointy betaling gelukt u zit in de wachtlijst na 3 maanden kan je er in of wanneer een plaats vrijkomt wordt u gecontacteerd.');
                    }
            }
                break;
            default:
                Log::info('Unhandled event type', ['type' => $event->type]);
        }

        return response()->json(['status' => 'success'], Response::HTTP_OK);
    }
}
