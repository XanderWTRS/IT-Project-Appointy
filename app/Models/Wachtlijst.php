<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wachtlijst extends Model
{
    use HasFactory;

    protected $table = 'wachtlijst';

    protected $fillable = [
        'user_id',
        'added_at',
        'can_make_appointment_at',
        'behandeling',
    ];

    protected $casts = [
        'added_at' => 'date',
        'can_make_appointment_at' => 'date',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
