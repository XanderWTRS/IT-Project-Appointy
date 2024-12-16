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

        //Behandelingen Info
        elseif (str_contains($userMessage, 'tandheelkunde')) {
            return response()->json(['response' => 'Tandheelkunde behandelt algemene tandheelkundige zorg, zoals controles, vullingen en tandreiniging.']);
        }
        elseif (str_contains($userMessage, 'orthodontie') || str_contains($userMessage, 'beugel')) {
            return response()->json(['response' => 'Orthodontie richt zich op het corrigeren van tand- en kaakproblemen met behulp van beugels en andere hulpmiddelen.']);
        }
        elseif (str_contains($userMessage, 'endodontie')) {
            return response()->json(['response' => 'Endodontie behandelt de tandzenuw en is vaak nodig bij tandinfecties, zoals wortelkanaalbehandelingen.']);
        }
        elseif (str_contains($userMessage, 'parodontologie')) {
            return response()->json(['response' => 'Parodontologie richt zich op het behandelen van tandvleesproblemen, zoals ontstekingen en terugtrekking van het tandvlees.']);
        }
        // Easter egg: Michael Jackson
        elseif (str_contains($userMessage, 'michael jackson'))
        {
            return response()->json([
                'response' => 'Hee-hee! 🎶',
                'playSound' => '/Assets/Sounds/MichaelJackson.mp3'
            ]);
        }

        // Fouten afhandelen (Handling mistakes)
        elseif (str_contains($userMessage, 'afspraak maken') || str_contains($userMessage, 'afspraak') || str_contains($userMessage, 'afsprak maken') || str_contains($userMessage, 'afspreken')) {
            return response()->json(['response' => 'Je kunt een afspraak maken door naar onze website te gaan of ons te bellen op 053 66 75 05.']);
        }
        elseif (str_contains($userMessage, 'open') || str_contains($userMessage, 'openings') || str_contains($userMessage, 'wacht') || str_contains($userMessage, 'tijd') || str_contains($userMessage, 'openingsuren') || str_contains($userMessage, 'wachtijd')) {
            return response()->json(['response' => 'Onze praktijk is van maandag tot vrijdag geopend van 09:00 tot 17:00.']);
        }
        elseif (str_contains($userMessage, 'help') || str_contains($userMessage, 'assistentie') || str_contains($userMessage, 'hulp') || str_contains($userMessage, 'kan je helpen') || str_contains($userMessage, 'helpen')) {
            return response()->json(['response' => 'Natuurlijk! Hoe kan ik je helpen?']);
        }
        elseif (str_contains($userMessage, 'sorry') || str_contains($userMessage, 'mijn excuses')) {
            return response()->json(['response' => 'Geen probleem, ik ben er om te helpen!']);
        }

        //Typo-afhandeling
        elseif (str_contains($userMessage, 'afbrak') || str_contains($userMessage, 'afspraaken') || str_contains($userMessage, 'afspreek') || str_contains($userMessage, 'afpsraak')) {
            return response()->json(['response' => 'Bedoel je "afspraak maken"? Ik help je graag verder.']);
        }
        elseif (str_contains($userMessage, 'openinsuren') || str_contains($userMessage, 'openings')) {
            return response()->json(['response' => 'Je bedoelt waarschijnlijk "openingsuren". Onze praktijk is van maandag tot vrijdag geopend van 09:00 tot 17:00.']);
        }
        elseif (str_contains($userMessage, 'afsprak maken') || str_contains($userMessage, 'afspraken maken')) {
            return response()->json(['response' => 'Ik geloof dat je "afspraak maken" bedoelt. Hoe kan ik je helpen met je afspraak?']);
        }
        elseif (str_contains($userMessage, 'telefoon nummer') || str_contains($userMessage, 'telefoon')) {
            return response()->json(['response' => 'Ons telefoonnummer is 053 66 75 05.']);
        }
        elseif (str_contains($userMessage, 'locatie') || str_contains($userMessage, 'adres') || str_contains($userMessage, 'waar zijn jullie')) {
            return response()->json(['response' => 'Ons adres is Molenstraat 101 - 1770 Liedekereke.']);
        }

        //Default antwoord
        else {
            return response()->json(['response' => 'Sorry, ik begrijp de vraag niet. Kun je het anders formuleren?']);
        }
    }
}
