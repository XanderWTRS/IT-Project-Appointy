<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personeel extends Model
{
    use HasFactory;

<<<<<<< HEAD
    protected $table = 'personeel'; // Koppel het model aan de 'personeel' tabel

    protected $fillable = [
        'voornaam',
        'naam',
        'functie',
        'bio',
    ];
=======
    protected $table = 'personeel'; // Zorg dat de tabelnaam overeenkomt met je migratie

    // Velden die je mag invullen
    protected $fillable = ['voornaam', 'naam', 'functie', 'bio', 'foto', 'created_at', 'updated_at'];
>>>>>>> 753bd0a3cb29f0f2ad9db90fc4d570c223be756b
}
