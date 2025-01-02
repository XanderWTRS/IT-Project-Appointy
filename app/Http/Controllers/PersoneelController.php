<?php

namespace App\Http\Controllers;

use App\Models\Personeel;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PersoneelController extends Controller
{
    public function index()
    {
        $personeel = Personeel::all();
        return Inertia::render('Admin/PersoneelPage', [
            'personeel' => $personeel,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'voornaam' => 'required|string|max:255',
            'naam' => 'required|string|max:255',
            'functie' => 'required|string|max:255',
            'bio' => 'required|string',
            'foto' => 'nullable|image',
        ]);

        if ($request->hasFile('foto')) {
            $fileName = time() . '_' . $request->file('foto')->getClientOriginalName();
            $filePath = $request->file('foto')->move(public_path('Assets/Team-Liedent'), $fileName);
            $validated['foto'] = '' . $fileName;
        }
        Personeel::create($validated);
        return response()->json(['message' => 'Personeelslid succesvol toegevoegd'], 201);
    }

    public function getTeamIds()
    {
        $ids = Personeel::pluck('id');
        return response()->json($ids);
    }

    public function destroy($id)
    {
        $personeel = Personeel::findOrFail($id);
        if ($personeel->foto) {
            $fotoPath = public_path('Assets/Team-Liedent/' . $personeel->foto);
            if (file_exists($fotoPath)) {
                unlink($fotoPath);
            }
        }
        $personeel->delete();
        return response()->json(['message' => 'Personeelslid succesvol verwijderd'], 200);
    }

    public function update(Request $request, $id)
{
    $personeel = Personeel::findOrFail($id);

    $validated = $request->validate([
        'voornaam' => 'required|string|max:255',
        'naam' => 'required|string|max:255',
        'functie' => 'required|string|max:255',
        'bio' => 'required|string',
        'foto' => 'nullable|image',
    ]);

    if ($request->hasFile('foto')) {
        if ($personeel->foto) {
            $oldPath = public_path('Assets/Team-Liedent/' . $personeel->foto);
            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        $fileName = time() . '_' . $request->file('foto')->getClientOriginalName();
        $filePath = $request->file('foto')->move(public_path('Assets/Team-Liedent'), $fileName);
        $validated['foto'] = $fileName;
    }

    $personeel->update($validated);
    return redirect()->route('admin.personeel')->with('success', 'Personeelslid succesvol bijgewerkt');
}


public function edit($id)
{
    $personeel = Personeel::findOrFail($id);

    return Inertia::render('Admin/EditPersoneelPage', [
        'personeel' => $personeel,
    ]);
}

}
