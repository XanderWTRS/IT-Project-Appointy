<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

use App\Http\Controllers\KlantenController;
use App\Http\Controllers\UserController;


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
    return redirect()->route('profile.edit');
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

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/klanten', [KlantenController::class, 'index'])->name('klanten');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');

});

Route::get('/admin/users/{id}/edit', [UserController::class, 'edit'])->name('admin.UserDetailsPage');



Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');


require __DIR__.'/auth.php';
