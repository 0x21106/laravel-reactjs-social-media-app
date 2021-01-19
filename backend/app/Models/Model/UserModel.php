<?php

namespace App\Models\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    use HasFactory;

    protected $table = "users";
    protected $fillable = [
        'username',
        'password',
        'email',
        'profile'
    ];
}
