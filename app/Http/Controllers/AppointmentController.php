<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AppointmentController extends Controller
{
    public function create()
    {
        $user = Auth::user();

        return inertia('AppointmentForm', [
            'keuze_email' => $user->keuze_email,
            'keuze_sms' => $user->keuze_gsm,
            'csrf_token' => csrf_token(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'treatment' => 'required|string',
            'keuze_email' => 'nullable|boolean',
            'keuze_sms' => 'nullable|boolean',
            'agreedToTerms' => 'required|boolean|accepted',
        ]);

        $user = Auth::user();

        $user->update([
            'keuze_email' => $request->input('keuze_email', false),
            'keuze_sms' => $request->input('keuze_sms', false),
        ]);


        return redirect()->route('dashboard')->with('success', 'Appointment successfully submitted!');
    }


}

