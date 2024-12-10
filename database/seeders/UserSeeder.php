<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'voornaam' => 'test',
            'naam' => 'test',
            'geboortedatum' => '1990-01-01',
            'mutualiteit' => 'Partena',
            'rijksregister_nr' => '90010100100',
            'tandarts' => 'Dr. Janssens',
            'gsm_nummer' => '0499123456',
            'email' =>'test@test.com',
            'password' => Hash::make('testtest'),
            'datum_registratie' => '2021-01-01',
            'keuze_sms' => true,
            'keuze_email' => true,
            'betaald' => false]);
    }
}
