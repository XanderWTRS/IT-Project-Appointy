<?php

namespace App\Http\Controllers;

use App\Models\Afspraak;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AfspraakController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search', '');

        $afspraken = Afspraak::with('user')
        ->whereHas('user') // Alleen afspraken met gekoppelde gebruikers
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
}
