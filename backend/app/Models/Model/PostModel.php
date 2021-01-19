<?php

namespace App\Models\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostModel extends Model
{
    use HasFactory;
    
    protected $table = "posts";
    protected $fillable = [
        'userId',
        'text',
    ];
}
