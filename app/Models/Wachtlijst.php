<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wachtlijst extends Model
{
    use HasFactory;

    // Define the table name (in case it doesn't follow Laravel's naming convention)
    protected $table = 'wachtlijst';

    // The attributes that are mass assignable
    protected $fillable = [
        'user_id',
        'added_at',
        'behandeling',
    ];

    // Disable auto-incrementing ID since we don't use it here
    public $incrementing = false;

    // Define the primary key (if it's not the default `id`)
    protected $primaryKey = 'user_id';

    // Define the attribute casting
    protected $casts = [
        'added_at' => 'datetime',
    ];
}
