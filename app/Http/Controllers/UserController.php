<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
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

    
}
