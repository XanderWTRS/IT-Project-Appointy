<?php

namespace App\Http\Controllers;

use App\Models\User; // Make sure this matches your user model
use Inertia\Inertia;
use Illuminate\Http\Request;

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
}
