<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $settings = [
            'smsActive' => $user->keuze_sms,
            'emailActive' => $user->keuze_email, 
        ];

        return Inertia::render('Profile/MeldingenPage', [
            'auth' => $user,
            'notificationSettings' => $settings,
        ]);
    }

    public function updateMeldingen(Request $request)
    {
        $user = auth()->user();

        if ($request->type === 'sms') {
            $user->keuze_sms = $request->value;
        } elseif ($request->type === 'email') {
            $user->keuze_email = $request->value;
        }

        $user->save();

        return response()->json(['success' => true]);
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Admin/UserDetailsPage', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Valideer de gegevens
        $validatedData = $request->validate([
            'voornaam' => 'required|string|max:255',
            'naam' => 'required|string|max:255',
            'gsm_nummer' => 'nullable|string|max:20',
            'rijksregister_nr' => 'nullable|string|max:50',
            'mutualiteit' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        // Zoek de gebruiker en werk de gegevens bij
        $user = User::findOrFail($id);
        $user->update($validatedData);

        return response()->json(['message' => 'Gebruiker succesvol bijgewerkt']);
    }

    public function destroy($id)
    {
        // Zoek en verwijder de gebruiker
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('home');
    }

    public function updateNotifications(Request $request, $id)
    {
        $validatedData = $request->validate([
            'keuze_sms' => 'required|boolean',
            'keuze_email' => 'required|boolean',
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'keuze_sms' => $validatedData['keuze_sms'],
            'keuze_email' => $validatedData['keuze_email'],
        ]);

        return redirect()->back()->with('success', 'Meldingsvoorkeuren succesvol bijgewerkt.');
    }

    
}
