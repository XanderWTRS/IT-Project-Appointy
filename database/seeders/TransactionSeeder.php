<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\User;
use Faker\Factory as Faker;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $userIds = User::inRandomOrder()->take(25)->pluck('id');

        foreach ($userIds as $userId) {
            Transaction::create([
                'status' => 'completed',
                'user_id' => $userId,
                'session_id' => $faker->regexify('cs_test_[A-Za-z0-9]{24}'),
                'keuze_email' => $faker->boolean(),
                'keuze_sms' => $faker->boolean(),
                'amount' => 10000,
                'behandeling' => $faker->randomElement(['tandheelkunde', 'orthodontie', 'endodontie', 'parodontologie']),
                'payment_intent_id' => $faker->regexify('pi_[A-Za-z0-9]{24}'),
                'created_at' => $faker->dateTimeBetween('-6 months', 'now'),
                'updated_at' => $faker->dateTimeBetween('-6 months', 'now'),
            ]);
        }
        $this->command->info('25 Completed Transactions have been seeded successfully!');
    }
}
