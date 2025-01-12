<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';

    protected $fillable = [
        'status',
        'user_id',
        'session_id',
        'keuze_email',
        'keuze_sms',
        'amount',
        'behandeling',
        'payment_intent_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
