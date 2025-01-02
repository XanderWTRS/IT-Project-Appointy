<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personeel extends Model
{
    use HasFactory;

    protected $table = 'personeel';

    protected $fillable = ['voornaam', 'naam', 'functie', 'bio', 'foto', 'created_at', 'updated_at'];
}
