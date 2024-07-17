<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skor extends Model
{
    use HasFactory;
    protected $fillable = [
        'klub_satu_id',
        'klub_dua_id',
        'skor_satu',
        'skor_dua',
    ];

    public function klubSatu(): BelongsTo
    {
        return $this->belongsTo(Klub::class, 'klub_satu_id');
    }
    public function klubDua(): BelongsTo
    {
        return $this->belongsTo(Klub::class, 'klub_dua_id');
    }
}
