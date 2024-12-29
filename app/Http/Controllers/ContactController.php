<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendContact(Request $request)
    {
        // Validatie van de ingevoerde gegevens
        $validated = $request->validate([
            'naam' => 'required|string|max:255',
            'achternaam' => 'required|string|max:255',
            'straat' => 'required|string|max:255',
            'postcode' => 'required|string|max:10',
            'gemeente' => 'required|string|max:255',
            'telefoon' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'vraag' => 'required|string',
            'privacy_policy' => 'accepted',
        ]);

        // Samenstellen van e-mailbericht
        $mailBody = "
            Naam: {$validated['naam']} {$validated['achternaam']}
            Straat: {$validated['straat']}
            Postcode: {$validated['postcode']}
            Gemeente: {$validated['gemeente']}
            Telefoon: {$validated['telefoon']}
            E-mail: {$validated['email']}
            
            Vraag:
            {$validated['vraag']}
        ";

        // Verzenden van e-mail
        Mail::raw($mailBody, function ($message) use ($validated) {
            $message->to('appointy@maxelix-solutions.be')
                    ->subject('Nieuw contactformulier ingediend');
        });

        // Redirect gebruiker met succesbericht
        return redirect()->back()->with('success', 'Uw bericht is succesvol verzonden.');
    }
}
