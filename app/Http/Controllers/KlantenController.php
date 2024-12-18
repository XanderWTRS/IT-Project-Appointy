<?php

namespace App\Http\Controllers;

use App\Models\User; // Make sure this matches your user model
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;


class KlantenController extends Controller
{
    public function index(Request $request)
    {
        // Haal de zoekterm op uit de request
        $search = $request->query('search');
    
        // Filter klanten op basis van de zoekterm
        $klanten = User::query()
            ->when($search, function ($query, $search) {
                $query->where('voornaam', 'like', "%{$search}%")
                    ->orWhere('naam', 'like', "%{$search}%")
                    ->orWhere('rijksregister_nr', 'like', "%{$search}%");
            })
            ->select('id', 'voornaam', 'naam', 'rijksregister_nr')
            ->get();
    
        // Retourneer de data naar de pagina
        return Inertia::render('Admin/KlantenPage', [
            'klanten' => $klanten,
        ]);
    }

    public function store(Request $request)
    {
        // Valideer de invoer
        $validatedData = $request->validate([
            'voornaam' => 'required|string|max:255',
            'naam' => 'required|string|max:255',
            'geboortedatum' => 'required|date',
            'mutualiteit' => 'nullable|string|max:255',
            'rijksregister_nr' => 'required|string|max:255|unique:users,rijksregister_nr',
            'tandarts' => 'nullable|string|max:255',
            'gsm_nummer' => 'required|string|max:20',
            'email' => 'required|email|max:255|unique:users,email',
        ]);
    
        // Voeg een tijdelijke user_id en standaard wachtwoord toe
        $validatedData['password'] = Hash::make('123456789'); // Standaard wachtwoord
        $validatedData['datum_registratie'] = now(); // Registratiedatum
        $validatedData['user_id'] = Str::uuid(); // Unieke UUID als user_id
    
        // Maak de gebruiker aan
        User::create($validatedData);
    
        return response()->json(['message' => 'Klant succesvol aangemaakt'], 201);
    }

}
