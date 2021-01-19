<?php

namespace App\Models\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentModel extends Model
{
    use HasFactory;
    
    protected $table = "comments";
    protected $fillable = [
        'post_id',
        'text',
        'uid',
        'parent'
    ];
}
