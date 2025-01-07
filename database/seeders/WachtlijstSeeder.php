<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Wachtlijst;
use Faker\Factory as Faker;

class WachtlijstSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $usersWithoutAppointments = User::whereDoesntHave('afspraken')->pluck('id')->toArray();

        if (empty($usersWithoutAppointments)) {
            $this->command->info('Geen gebruikers zonder afspraken gevonden.');
            return;
        }

        $behandelingen = ['tandheelkunde', 'orthodontie', 'endodontologie', 'parodontologie'];

        foreach ($usersWithoutAppointments as $userId) {

            $canMakeAppointmentAt = $faker->optional()->dateTimeBetween('now', '+2 months');

            Wachtlijst::create([
                'user_id' => $userId,
                'added_at' => $faker->dateTimeBetween('-1 months', '+1 months')->format('Y-m-d'),
                'behandeling' => $faker->randomElement($behandelingen),
                'can_make_appointment_at' => $canMakeAppointmentAt ? $canMakeAppointmentAt->format('Y-m-d') : null,
            ]);
        }

        $this->command->info('Wachtlijst is succesvol gevuld met gebruikers zonder afspraken.');
    }
}
