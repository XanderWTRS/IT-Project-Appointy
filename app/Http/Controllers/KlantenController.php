<?php

namespace App\Http\Controllers;

use App\Models\User; // Make sure this matches your user model
use Inertia\Inertia;

class KlantenController extends Controller
{
    public function index()
    {
        // Fetch necessary data from the database
        $klanten = User::select('id', 'voornaam', 'naam', 'rijksregister_nr')->get();

        // Pass data to the Inertia page
        return Inertia::render('Admin/KlantenPage', [
            'klanten' => $klanten,
        ]);
    }
}
