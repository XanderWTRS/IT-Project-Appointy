<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use App\Models\User;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        User::create([
            'voornaam' => 'Admin',
            'naam' => 'User',
            'geboortedatum' => $faker->date($format = 'Y-m-d', $max = '2010-01-01'),
            'mutualiteit' => null,
            'rijksregister_nr' => encryptCompact($faker->regexify('[0-9]{11}')),
            'tandarts' => null,
            'gsm_nummer' => '+32400000000',
            'email' => 'admin@admin.be',
            'password' => Hash::make('12345678'),
            'datum_registratie' => now(),
            'keuze_sms' => false,
            'keuze_email' => false,
            'betaald' => false,
        ]);

        for ($i = 0; $i < 50; $i++) {
            $gsmNummer = $faker->boolean
                ? '+324' . $faker->numberBetween(10000000, 99999999)
                : '04' . $faker->numberBetween(10000000, 99999999);

            User::create([
                'voornaam' => $faker->firstName,
                'naam' => $faker->lastName,
                'geboortedatum' => $faker->date($format = 'Y-m-d', $max = '2010-01-01'),
                'mutualiteit' => $faker->randomElement(['Partena', 'CM', 'LM', 'OZ', 'Bond Moyson']),
                'rijksregister_nr' => encryptCompact($faker->regexify('[0-9]{11}')),
                'tandarts' => 'Dr. ' . $faker->lastName,
                'gsm_nummer' => $gsmNummer,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password123'),
                'datum_registratie' => $faker->date($format = 'Y-m-d', $max = 'now'),
                'keuze_sms' => $faker->boolean,
                'keuze_email' => $faker->boolean,
                'betaald' => $faker->boolean,
            ]);
        }
    }
}
