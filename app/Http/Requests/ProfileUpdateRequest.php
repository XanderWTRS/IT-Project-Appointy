<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        return [
            'voornaam' => ['required', 'string', 'max:255'],
            'naam' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', Rule::unique('users')->ignore($this->user()->id)],
            'geboortedatum' => ['nullable', 'date'],
            'mutualiteit' => ['nullable', 'string', 'max:255'],
            'rijksregister_nr' => ['nullable', 'string', 'max:255'],
            'tandarts' => ['nullable', 'string', 'max:255'],
            'gsm_nummer' => ['nullable', 'string', 'max:255'],
            'datum_registratie' => ['nullable', 'date'],
            'keuze_sms' => ['nullable', 'string', 'max:255'],
            'keuze_email' => ['nullable', 'string', 'max:255'],
            'betaald' => ['nullable', 'boolean'],
            'new_password' => ['nullable', 'string', 'min:8'],
        ];
    }
}
