<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppointmentController;

use App\Http\Controllers\KlantenController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/register', function () {
    return Inertia::render('Register');
})->middleware(['auth', 'verified'])->name('register');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'auth' => [
            'user' => Auth::user(),
        ],]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/appointment', [AppointmentController::class, 'create'])->name('appointment.create');
    Route::post('/appointment', [AppointmentController::class, 'store'])->name('appointment.store');
});


Route::get('/klanten', function () {
    return Inertia::render('KlantenPage'); 
})->name('klanten');

Route::get('/tandheelkunde', function () {
    return Inertia::render('TandheelkundePage');
})->name('tandheelkunde');

Route::get('/orthodontie', function () {
    return Inertia::render('OrthodontiePage');
})->name('orthodontie');

Route::get('/endodontie', function () {
    return Inertia::render('EndodontiePage');
})->name('endodontie');

Route::get('/paradontologie', function () {
    return Inertia::render('ParadontologiePage');
})->name('paradontologie');


Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/klanten', function () {
        return Inertia::render('Admin/KlantenPage');
    })->name('klanten');

        // Nieuwe pagina (AdminPage)
        Route::get('/nieuwe-pagina', function () {
            return Inertia::render('Admin/AdminPage');
        })->name('nieuwe-pagina');
});

Route::get('/admin/klanten', [KlantenController::class, 'index'])->name('admin.klanten');

require __DIR__.'/auth.php';
