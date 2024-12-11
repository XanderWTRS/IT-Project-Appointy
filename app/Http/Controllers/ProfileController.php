<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => !$request->user()->hasVerifiedEmail(),
            'status' => session('status'),
            'user' => $request->user(),
        ]);
    }

    public function update(ProfileUpdateRequest $request)
    {
        $user = $request->user();
        $validatedData = $request->validated();

        $user->update([
            'voornaam' => $validatedData['voornaam'] ?? $user->voornaam,
            'naam' => $validatedData['naam'] ?? $user->naam,
            'email' => $validatedData['email'] ?? $user->email,
            'geboortedatum' => $validatedData['geboortedatum'] ?? $user->geboortedatum,
            'mutualiteit' => $validatedData['mutualiteit'] ?? $user->mutualiteit,
            'rijksregister_nr' => $validatedData['rijksregister_nr'] ?? $user->rijksregister_nr,
            'tandarts' => $validatedData['tandarts'] ?? $user->tandarts,
            'gsm_nummer' => $validatedData['gsm_nummer'] ?? $user->gsm_nummer,
            'datum_registratie' => $validatedData['datum_registratie'] ?? $user->datum_registratie,
            'keuze_sms' => $validatedData['keuze_sms'] ?? $user->keuze_sms,
            'keuze_email' => $validatedData['keuze_email'] ?? $user->keuze_email,
            'betaald' => $validatedData['betaald'] ?? $user->betaald,
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'Profile updated successfully!');
    }
    

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
