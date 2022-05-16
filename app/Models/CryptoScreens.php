<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class CryptoScreens extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Base table.
     */

    protected $table = 'crypto_screens';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'userid',
        'api',
        'coin',
        'price',
        'capital',
        'volume',
        'change',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [];

    /**
     * Get the user that owns the portfolios.
     */
    public function user()
    {
        return $this->belongsTo(Users::class, 'userid');
    }
}
