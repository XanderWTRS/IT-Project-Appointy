<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Afspraak extends Model
{
    use HasFactory;

    protected $table = 'afspraken';
    
    protected $primaryKey = 'afspraak_id';

    protected $fillable = [
        'user_id',
        'datum',
        'tijd',
        'behandeling',
    ];

    public function user()
{
    return $this->belongsTo(User::class, 'user_id', 'id');
}

}
