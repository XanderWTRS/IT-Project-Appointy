<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatBotController extends Controller
{
    private $responses = [
        'What are your working hours?' => 'Our working hours are Mon-Fri: 08:00 - 17:00, Sat-Sun: Closed.',
        'What is your address?' => 'Molenstraat 101, 1770 Liedekereke.',
        'How can I book an appointment?' => 'You can book an appointment via the "Afspraak Maken" button on our homepage.',
    ];

    public function getAnswer(Request $request)
    {
        $question = $request->input('question');
        $answer = $this->responses[$question] ?? 'Sorry, I don\'t have an answer for that.';
        return response()->json(['answer' => $answer]);
    }
}
