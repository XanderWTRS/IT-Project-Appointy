<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class KlantenController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $klanten = User::select('id', 'voornaam', 'naam', 'rijksregister_nr')
        ->get()
        ->map(function ($klant) {
            try {
                $klant->rijksregister_nr = decryptCompact($klant->rijksregister_nr);
            } catch (\Exception $e) {
                $klant->rijksregister_nr = 'Onbekend';
            }
            return $klant;
        });

        if ($search) {
            $klanten = $klanten->filter(function ($klant) use ($search) {
                return stripos($klant->voornaam, $search) !== false ||
                       stripos($klant->naam, $search) !== false ||
                       stripos($klant->rijksregister_nr, $search) !== false;
            });
        }

        return Inertia::render('Admin/KlantenPage', [
            'klanten' => $klanten->values(),
        ]);
    }
}
