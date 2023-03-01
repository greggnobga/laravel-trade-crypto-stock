<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Verification extends Model
{
    use HasFactory;

    protected $table = "users_verify";

    /**
     * Write code on Method
     *
     */
    protected $fillable = [
        'userid',
        'token',
    ];

    /**
     * Write code on Method
     *
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
