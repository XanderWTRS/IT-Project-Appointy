<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Middleware\AdminMiddleware;

use App\Http\Controllers\KlantenController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AfspraakController;
use App\Http\Controllers\WachtlijstController;
use App\Http\Controllers\ExcelImportController;
use App\Http\Controllers\ChatbotController;
use App\Models\Personeel;
use App\Http\Controllers\PersoneelController;
use App\Http\Controllers\ContactController;

Route::get('/', function () {
    if (Auth::check() && Auth::user()->is_admin) {
        return redirect()->route('admin.klanten'); // Redirect admins to their dashboard
    }

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


// User profile
Route::middleware(['auth'])->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::post('/delete-account/{id}', [UserController::class, 'destroy'])->name('delete-account');
    Route::get('/meldingen', [UserController::class, 'index'])->name('meldingen');
    Route::post('/notifications/update', [UserController::class, 'updateMeldingen'])->name('notifications.update');
});



// Payment
Route::middleware('auth')->group(function () {
    Route::get('/payment', [PaymentController::class, 'index'])->name('payment.index');
    Route::get('/payment/success', [PaymentController::class, 'succes'])->name('payment.succes');
    Route::get('/payment/cancel', [PaymentController::class, 'cancel'])->name('payment.cancel');
    Route::post('/payment/paypositionwaitlist', [PaymentController::class, 'paypositionwaitlist'])->name('payment.paypositionwaitlist');

    Route::get('pay-boete/{id}/success', [PaymentController::class, 'successBoete'])->name('successBoete');
    Route::get('/pay-boete', [PaymentController::class, 'payFine'])->name('payment.payFine');
});

Route::post('/payment/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');


Route::get('/afspraken', [WachtlijstController::class, 'wachtlijst'])->name('afspraken');
Route::post('/afspraken/annuleerWachtlijst', [WachtlijstController::class, 'cancelWaitlist'])->name('afspraken.cancelWachtlijst');
Route::post('/afspraken/annuleerAfspraak', [AfspraakController::class, 'cancelAfspraak'])->name('afspraken.cancelAfspraak');
Route::get('/release-users', [WachtlijstController::class, 'releaseUsers'])->name('release.users');

Route::get('/afspraken/make', [WachtlijstController::class, 'make'])->name('afspraken.make');
Route::post('/afspraken/store', [WachtlijstController::class, 'storeAfspraak'])->name('afspraak.store');



Route::get('/klanten', function () {
    return Inertia::render('KlantenPage');
})->name('klanten');

// Behandelingen
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

Route::prefix('admin')->name('admin.')->middleware(AdminMiddleware::class)->group(function () {
    Route::get('/klanten', [KlantenController::class, 'index'])->name('klanten');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/afspraken', [AfspraakController::class, 'index'])->name('afspraken');
    Route::get('/personeel', function () {
        return Inertia::render('Admin/PersoneelPage');
    })->name('personeel');
    Route::get('/add-personeel', function () {
        return Inertia::render('Admin/AddPersoneelPage');
    })->name('add-personeel');

    Route::post('/add-personeel', [PersoneelController::class, 'store'])->name('personeel.store');
    Route::get('/team-ids', [PersoneelController::class, 'getTeamIds'])->name('admin.team-ids');
    Route::post('/upload-excel', [ExcelImportController::class, 'uploadExcel']);

    Route::patch('/personeel/{id}', [PersoneelController::class, 'update'])->name('personeel.update');
    Route::delete('/personeel/{id}', [PersoneelController::class, 'destroy'])->name('personeel.destroy');
   

    Route::get('/edit-personeel/{id}', [PersoneelController::class, 'edit'])->name('admin.edit-personeel');

});

Route::get('/admin/users/{id}/edit', [UserController::class, 'edit'])->name('admin.UserDetailsPage');
Route::patch('/admin/users/{id}/toggle-boete', [UserController::class, 'toggleBoete']);



Route::post('/chat', [ChatbotController::class, 'handle']);

Route::get('/admin/afspraken/{id}/edit', [AfspraakController::class, 'edit'])->name('admin.afspraken.edit');
Route::post('/admin/afspraken/{id}/update', [AfspraakController::class, 'update'])->name('admin.afspraken.update');


Route::get('/personeel/data/{id}', function ($id) {
    $personeel = Personeel::find($id);

    if (!$personeel) {
        return response()->json(['message' => 'Personeel niet gevonden'], 404);
    }

    return response()->json($personeel);
});

Route::get('/afspraakregelement', function () {
    return Inertia::render('AfspraakRegelement');
})->name('afspraakregelement');

Route::get('/privacypolicy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacypolicy');

Route::get('/afspraak-selectie', function () {
    return Inertia::render('AfspraakOptiePage');
})->name('afspraak-selectie');

Route::post('/contact', [ContactController::class, 'sendContact'])->name('contact.send');

Route::get('/team-ids', [PersoneelController::class, 'getTeamIds']);

require __DIR__.'/auth.php';
