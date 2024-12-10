<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate the form data
        $request->validate([
            'voornaam' => 'required|string|max:255',
            'naam' => 'required|string|max:255',
            'geboortedatum' => 'required|date',
            'mutualiteit' => 'nullable|string|max:255',
            'rijksregister_nr' => 'required|string|size:11|unique:users,rijksregister_nr',
            'tandarts' => 'nullable|string|max:255',
            'gsm_nummer' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'keuze_sms' => 'required|boolean',
            'keuze_email' => 'required|boolean',
        ]);

        // Create the user record
        $user = User::create([
            'voornaam' => $request->voornaam,
            'naam' => $request->naam,
            'geboortedatum' => $request->geboortedatum,
            'mutualiteit' => $request->mutualiteit,
            'rijksregister_nr' => $request->rijksregister_nr,
            'tandarts' => $request->tandarts,
            'gsm_nummer' => $request->gsm_nummer,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'keuze_sms' => $request->keuze_sms,
            'keuze_email' => $request->keuze_email,
        ]);

        // Trigger the Registered event
        event(new Registered($user));

        // Log in the new user
        Auth::login($user);

        // Redirect to the home page or any other route
        return redirect(route('home', absolute: false));
    }
}
