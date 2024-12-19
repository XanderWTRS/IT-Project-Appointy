<?php

namespace App\Http\Controllers;

use App\Models\Personeel;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PersoneelController extends Controller
{
    /**
     * Toon een lijst van alle personeel.
     */
    public function index()
    {
        $personeel = Personeel::all();
        return Inertia::render('Admin/PersoneelPage', [
            'personeel' => $personeel,
        ]);
    }

    /**
     * Sla nieuw personeel op in de database.
     */
    public function store(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'voornaam' => 'required|string|max:255',
            'naam' => 'required|string|max:255',
            'functie' => 'required|string|max:255',
            'bio' => 'required|string',
            'foto' => 'nullable|image',
        ]);

        if ($request->hasFile('foto')) {
            // Save the file in the public/Assets/Team-Liedent folder
            $fileName = time() . '_' . $request->file('foto')->getClientOriginalName();
            $filePath = $request->file('foto')->move(public_path('Assets/Team-Liedent'), $fileName);
            $validated['foto'] = 'Assets/Team-Liedent/' . $fileName; // Save the relative path
        }

        // Save to the database
        Personeel::create($validated);

        return response()->json(['message' => 'Personeelslid succesvol toegevoegd'], 201);
    }
}
