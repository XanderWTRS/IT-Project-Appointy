<?php

namespace App\Http\Controllers;

use App\Models\Afspraak;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AfspraakController extends Controller
{
    // Methode voor het tonen van de afspraken
    public function index(Request $request)
    {
        $search = $request->query('search', '');

        $afspraken = Afspraak::with('user') // Laad de user-relatie
            ->when($search, function ($query, $search) {
                $query->where('datum', 'like', '%' . $search . '%')
                      ->orWhere('behandeling', 'like', '%' . $search . '%')
                      ->orWhereHas('user', function ($query) use ($search) {
                          $query->where('voornaam', 'like', '%' . $search . '%')
                                ->orWhere('naam', 'like', '%' . $search . '%');
                      });
            })
            ->get();

        return Inertia::render('Admin/AfsprakenPage', [
            'afspraken' => $afspraken,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    // Methode voor het laden van de edit-pagina
    public function edit($id)
    {
        $afspraak = Afspraak::findOrFail($id);

        $appointments = Afspraak::all()->groupBy('datum')->map(function ($items) {
            return $items->pluck('tijd');
        });

        return Inertia::render('Admin/AfspraakEditPage', [
            'afspraak' => $afspraak,
            'csrf_token' => csrf_token(),
            'appointments' => $appointments,
        ]);
    }

    // Methode voor het bijwerken van een afspraak
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required',
            'treatment' => 'required|string',
        ]);

        $afspraak = Afspraak::findOrFail($id);
        $afspraak->update([
            'datum' => $validated['date'],
            'tijd' => $validated['time'],
            'behandeling' => $validated['treatment'],
        ]);

        return redirect()->route('admin.afspraken')->with('success', 'Afspraak bijgewerkt.');
    }
}
