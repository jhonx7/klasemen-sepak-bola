<?php

use App\Http\Controllers\KlubController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [KlubController::class, 'index'])->name('home');
Route::post('/klub', [KlubController::class, 'tambahKlub'])->name('klub.tambah');
Route::get('/skor', [KlubController::class, 'skor'])->name('skor');
Route::post('/skor', [KlubController::class, 'tambahSkor'])->name('skor.tambah');
Route::get('/klasemen', [KlubController::class, 'klasemen'])->name('klasemen');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
