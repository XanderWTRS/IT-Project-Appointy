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

}
