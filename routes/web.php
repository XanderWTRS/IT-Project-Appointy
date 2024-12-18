<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

use App\Http\Controllers\KlantenController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AfspraakController;
use App\Http\Controllers\WachtlijstController;


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
    Route::get('/payment', [PaymentController::class, 'index'])->name('payment.index');
    Route::get('/payment/success', [PaymentController::class, 'succes'])->name('payment.succes');
    Route::get('/payment/cancel', [PaymentController::class, 'cancel'])->name('payment.cancel');
    Route::post('/payment/paypositionwaitlist', [PaymentController::class, 'paypositionwaitlist'])->name('payment.paypositionwaitlist');
});

Route::post('/payment/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');


Route::get('/afspraken', [WachtlijstController::class, 'wachtlijst'])->name('afspraken');
Route::post('/afspraken/annuleerWachtlijst', [WachtlijstController::class, 'cancelWaitlist'])->name('afspraken.cancelWachtlijst');
Route::post('/afspraken/annuleerAfspraak', [WachtlijstController::class, 'cancelAfspraak'])->name('afspraken.cancelAfspraak');


Route::get('/afspraken/make', [WachtlijstController::class, 'make'])->name('afspraken.make');
Route::post('/afspraak/store', [WachtlijstController::class, 'storeAfspraak'])->name('afspraak.store');



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
    Route::get('/afspraken', [AfspraakController::class, 'index'])->name('afspraken');
    Route::get('/personeel', function () {
        return Inertia::render('Admin/PersoneelPage');
    })->name('personeel');
});

Route::get('/admin/users/{id}/edit', [UserController::class, 'edit'])->name('admin.UserDetailsPage');



Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
Route::post('/delete-account/{id}', [UserController::class, 'destroy'])->name('delete-account');






require __DIR__.'/auth.php';
