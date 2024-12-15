<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    // Specify the table associated with the model (optional if it follows Laravel's naming convention)
    protected $table = 'transactions';

    // Specify the attributes that are mass assignable
    protected $fillable = [
        'status',
        'user_id',
        'session_id',
        'keuze_email',
        'keuze_sms',
        'amount',
        'behandeling',
    ];

    // Define the relationship to the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
