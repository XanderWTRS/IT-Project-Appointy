<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personeel extends Model
{
    use HasFactory;

    protected $table = 'personeel'; // Zorg dat de tabelnaam overeenkomt met je migratie

    // Velden die je mag invullen
    protected $fillable = ['voornaam', 'naam', 'functie', 'bio', 'foto', 'created_at', 'updated_at'];
}
