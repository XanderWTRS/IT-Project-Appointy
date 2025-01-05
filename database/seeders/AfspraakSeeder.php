<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Afspraak;
use App\Models\User;
use Faker\Factory as Faker;

class AfspraakSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $users = User::pluck('id')->toArray();

        if (empty($users)) {
            $this->command->info('No users found. Please seed the users table first.');
            return;
        }

        $behandelingen = [
            'tandheelkunde' => 'Tuesday',
            'orthodontie' => 'Tuesday',
            'endodontologie' => 'Thursday',
            'parodontologie' => 'Thursday',
        ];
        $tijden = ['10:00-10:30', '10:30-11:00', '15:00-15:30', '15:30-16:00'];

        for ($i = 0; $i < 15; $i++) {

            $behandeling = $faker->randomElement(array_keys($behandelingen));
            $dag = $behandelingen[$behandeling];

            $datum = $faker->dateTimeBetween('-1 year', '+1 year');
            while ($datum->format('l') !== $dag) {
                $datum->modify('+1 day');
            }

            Afspraak::create([
                'user_id' => $faker->randomElement($users),
                'datum' => $datum->format('Y-m-d'),
                'tijd' => $faker->randomElement($tijden),
                'behandeling' => $behandeling,
            ]);
        }
    }
}
