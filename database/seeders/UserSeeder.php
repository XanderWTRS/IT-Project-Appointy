<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 50; $i++) {
            $gsmNummer = $faker->boolean
                ? '+324' . $faker->numberBetween(10000000, 99999999)
                : '04' . $faker->numberBetween(10000000, 99999999);

            User::create([
                'voornaam' => $faker->firstName,
                'naam' => $faker->lastName,
                'geboortedatum' => $faker->date($format = 'Y-m-d', $max = '2010-01-01'),
                'mutualiteit' => $faker->randomElement(['Partena', 'CM', 'LM', 'OZ', 'Bond Moyson']),
                'rijksregister_nr' => $faker->regexify('[0-9]{11}'),
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
