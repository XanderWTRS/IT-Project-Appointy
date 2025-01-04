<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


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
        $user = Auth::user();

        $data = $request->validate([
            'type' => 'required|in:sms,email',
            'value' => 'required|boolean',
        ]);

        if ($data['type'] === 'sms') {
            $user->keuze_sms = $data['value'];
        } else {
            $user->keuze_email = $data['value'];
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
    try {
        // Attempt to find the user
        $user = User::findOrFail($id);

        // Delete the user
        $user->delete();

        return response()->json([
            'message' => 'Gebruiker succesvol verwijderd',
            'redirect' => route('admin.klanten')
        ]);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        // Handle if user is not found
        return response()->json(['message' => 'User not found'], 404);
    }
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

    public function toggleBoete($id)
    {
        $user = User::findOrFail($id);
        $user->boete = !$user->boete;
        $user->save();

        return response()->json(['boete' => $user->boete]);
    }
}
