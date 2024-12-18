<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personeel extends Model
{
    use HasFactory;

    protected $table = 'personeel'; // Koppel het model aan de 'personeel' tabel

    protected $fillable = [
        'voornaam',
        'naam',
        'functie',
        'bio',
    ];
}
