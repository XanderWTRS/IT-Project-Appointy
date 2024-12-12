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

        // Selecteer alleen de kolommen id, user_id, datum, behandeling
        // en filter op datum of behandeling indien search is ingevuld.
        $afspraken = Afspraak::select('afspraak_id', 'user_id', 'datum', 'behandeling')
            ->when($search, function ($query, $search) {
                $query->where('datum', 'like', '%' . $search . '%')
                      ->orWhere('behandeling', 'like', '%' . $search . '%');
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
