<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function handle(Request $request)
    {
        $userMessage = $request->input('message');
        $userMessage = strtolower($userMessage);

        //Eenvoudige antwoorden
        if (str_contains($userMessage, 'wachttijd') || str_contains($userMessage, 'wachtijd')) {
            return response()->json(['response' => 'De wachttijd is ongeveer 5 minuten.']);
        }
        elseif (str_contains($userMessage, 'openingsuren') || str_contains($userMessage, 'openingsuur')) {
            return response()->json(['response' => 'Onze openingsuren zijn van maandag tot vrijdag van 09:00 tot 17:00.']);
        }
        elseif (str_contains($userMessage, 'contact') || str_contains($userMessage, 'telefoonnummer')) {
            return response()->json(['response' => 'Je kan ons bereiken op het nummer 053 66 75 05.']);
        }
        elseif (str_contains($userMessage, 'locatie') || str_contains($userMessage, 'adres')) {
            return response()->json(['response' => 'Ons adres is Molenstraat 101 - 1770 Liedekereke.']);
        }
        elseif (str_contains($userMessage, 'bedankt')) {
            return response()->json(['response' => 'Graag gedaan!']);
        }
        elseif (str_contains($userMessage, 'hoe gaat het') || str_contains($userMessage, 'hoe gaat het met jou')) {
            return response()->json(['response' => 'Het gaat goed, bedankt! En met jou?']);
        }
        elseif (str_contains($userMessage, 'hallo') || str_contains($userMessage, 'hoi') || str_contains($userMessage, 'hey')) {
            return response()->json(['response' => 'Hallo! Hoe kan ik je helpen?']);
        }
        elseif (str_contains($userMessage, 'wie ben jij') || str_contains($userMessage, 'wie ben je')) {
            return response()->json(['response' => 'Ik ben een chatbot, hier om je te helpen met allerlei vragen!']);
        }
        elseif (str_contains($userMessage, 'wat doe je')) {
            return response()->json(['response' => 'Ik beantwoord vragen en help je met de informatie die je nodig hebt!']);
        }
        elseif (str_contains($userMessage, 'dank je wel') || str_contains($userMessage, 'dankjewel')) {
            return response()->json(['response' => 'Graag gedaan!']);
        }

        // Easter egg: Michael Jackson
        elseif (str_contains($userMessage, 'michael jackson')) {
            return response()->json([
                'response' => 'Hee-hee! 🎶',
                'playSound' => '/Assets/Sounds/MichaelJackson.mp3'
            ]);
        }

        //Fouten afhandelen
        elseif (str_contains($userMessage, 'afspraak maken') || str_contains($userMessage, 'afspraak')) {
            return response()->json(['response' => 'Je kunt een afspraak maken door naar onze website te gaan of ons te bellen op 053 66 75 05.']);
        } elseif (str_contains($userMessage, 'open') || str_contains($userMessage, 'openings') || str_contains($userMessage, 'wacht') || str_contains($userMessage, 'tijd')) {
            return response()->json(['response' => 'Onze praktijk is van maandag tot vrijdag geopend van 09:00 tot 17:00.']);
        } elseif (str_contains($userMessage, 'help') || str_contains($userMessage, 'assistentie')) {
            return response()->json(['response' => 'Natuurlijk! Hoe kan ik je helpen?']);
        } elseif (str_contains($userMessage, 'sorry')) {
            return response()->json(['response' => 'Geen probleem, ik ben er om te helpen!']);
        }

        //Default antwoord
        else {
            return response()->json(['response' => 'Sorry, ik begrijp de vraag niet. Kun je het anders formuleren?']);
        }
    }
}


