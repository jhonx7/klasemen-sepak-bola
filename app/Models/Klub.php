<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Klub extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama',
        'kota',
        'main',
        'menang',
        'seri',
        'kalah',
        'goal_menang',
        'goal_kalah',
        'poin',
    ];
}
