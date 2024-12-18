<?php

namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


class DataImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        
        try {
            if (User::where('rijksregister_nr', $row['rijksregister_nr'])->exists()) {
                throw ValidationException::withMessages([
                    'rijksregister_nr' => "Duplicate rijksregister_nr found: {$row['rijksregister_nr']}",
                ]);
            }
            $user = User::create([
                'voornaam' => $row['voornaam'],
                'naam' => $row['naam'],
                'geboortedatum' => $this->transformDate($row['geboortedatum']),
                'mutualiteit' => $row['mutualiteit'],
                'rijksregister_nr' => $row['rijksregister_nr'],
                'tandarts' => $row['tandarts'],
                'gsm_nummer' => $row['gsm_nummer'],
                'email' => $row['email'],
                'password' => bcrypt($row['password']),
                'datum_registratie' => now(),
                'keuze_sms' => $row['keuze_sms'] ?? false,
                'keuze_email' => $row['keuze_email'] ?? false,
                'betaald' => $row['betaald'] ?? false,
            ]);
            Log::info('User saved: ' . $user->id);
            return $user;
        } catch (ValidationException $e) {
            throw $e; 
        } catch (\Exception $e) {
            Log::error('Failed to save user: ' . $e->getMessage());
            return null;
        }
    }
    public function rules(): array
    {
        return [
            'voornaam' => 'required|string|max:255',
            'naam' => 'required|string|max:255',
            'geboortedatum' => 'required|date_format:Y-m-d',
            'rijksregister_nr' => 'required|unique:users,rijksregister_nr',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'tandarts' => 'required|string|max:255',
            'gsm_nummer' => 'required|string|max:255',
            'mutualiteit' => 'required|string|max:255',
            'keuze_sms' => 'boolean',
            'keuze_email' => 'boolean',
            'betaald' => 'boolean',
        ];
    }
    private function transformDate($value)
    {

        if (is_numeric($value)) {
            return Date::excelToDateTimeObject($value)->format('Y-m-d');
        }
        return $value;
    }
}

