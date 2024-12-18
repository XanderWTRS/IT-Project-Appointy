<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Personeel;

class PersoneelSeeder extends Seeder
{
    public function run()
    {
        $teamMembers = [
            [
                'voornaam' => 'Wouter',
                'naam' => 'Reybrouck',
                'functie' => 'TANDHEELKUNDE - ZAAKVOERDER',
                'bio' => 'Tandarts KULeuven 1993',
                'foto' => 'Team1.webp',
            ],
            [
                'voornaam' => 'Isabelle',
                'naam' => 'Savoye',
                'functie' => 'ORTHODONTIE - ZAAKVOERDER',
                'bio' => 'Tandarts KULeuven 1993, Specialist in Orthodontie KULeuven 1997',
                'foto' => 'Team2.webp',
            ],
            [
                'voornaam' => 'Linde',
                'naam' => 'Vanden Meerschaut',
                'functie' => 'PRAKTIJKMANAGER',
                'bio' => 'HoGent 2018',
                'foto' => 'Team3.webp',
            ],
            [
                'voornaam' => 'Tom',
                'naam' => 'De Backer',
                'functie' => 'AANGEZICHTSHEELKUNDE',
                'bio' => 'Arts KULeuven 1990, Tandarts KULeuven 1993, Maxillo Faciaal Chirurg 1997',
                'foto' => 'Team4.webp',
            ],
            [
                'voornaam' => 'Veronique',
                'naam' => 'De Bot',
                'functie' => 'TANDHEELKUNDE',
                'bio' => 'Tandarts KULeuven 1993',
                'foto' => 'Team5.webp',
            ],
            [
                'voornaam' => 'Julien',
                'naam' => 'Oosterbosch',
                'functie' => 'TANDHEELKUNDE',
                'bio' => 'Tandarts UCLLeuven 2021, Implantologie UFR3S de l’Université de Lille',
                'foto' => 'Team6.webp',
            ],
            [
                'voornaam' => 'Amber',
                'naam' => 'Segers',
                'functie' => 'TANDHEELKUNDE',
                'bio' => 'Tandarts UGent 2023',
                'foto' => 'Team7.webp',
            ],
            [
                'voornaam' => 'Aurélie',
                'naam' => 'Van Lancker',
                'functie' => 'TANDHEELKUNDE',
                'bio' => 'Tandarts UGent 2023',
                'foto' => 'Team8.webp',
            ],
            [
                'voornaam' => 'Emmeline',
                'naam' => 'Claus',
                'functie' => 'MONDHYGIËNISTE - ORTHODONTIE',
                'bio' => 'UCCL Leuven 2020',
                'foto' => 'Team9.webp',
            ],
            [
                'voornaam' => 'Ilona',
                'naam' => 'Beeckmans',
                'functie' => 'MONDHYGIËNISTE - ORTHODONTIE',
                'bio' => 'Artevelde Gent 2023',
                'foto' => 'Team10.webp',
            ],
            [
                'voornaam' => 'Latiffa',
                'naam' => 'Van Herreweghe',
                'functie' => 'BALIEVERANTWOORDELIJKE',
                'bio' => '',
                'foto' => 'Team11.webp',
            ],
            [
                'voornaam' => 'Annelien',
                'naam' => 'Borremans',
                'functie' => 'TANDARTS-/BALIEASSISTENTE',
                'bio' => '',
                'foto' => 'Team12.webp',
            ],
            [
                'voornaam' => 'Marlyn',
                'naam' => 'Van Cutsem',
                'functie' => 'ORTHO/LABO-ASSISTENTE',
                'bio' => '',
                'foto' => 'Team13.webp',
            ],
            [
                'voornaam' => 'Charlotte',
                'naam' => 'Ameys',
                'functie' => 'ORTHO/LABO-ASSISTENTE',
                'bio' => '',
                'foto' => 'Team14.webp',
            ],
            [
                'voornaam' => 'Elke',
                'naam' => 'Van Koppen',
                'functie' => 'ORTHO-ASSISTENTE',
                'bio' => '',
                'foto' => 'Team15.webp',
            ],
            [
                'voornaam' => 'Ann',
                'naam' => 'Schollaert',
                'functie' => 'ORTHO-ASSISTENTE',
                'bio' => '',
                'foto' => 'Team16.webp',
            ],
            [
                'voornaam' => 'Manar',
                'naam' => 'El Abboudi',
                'functie' => 'ORTHO-/TANDARTSASSISTENTE',
                'bio' => '',
                'foto' => 'Team17.webp',
            ],
            [
                'voornaam' => 'Aaron',
                'naam' => 'Van Isterdael',
                'functie' => 'TANDARTSASSISTENT',
                'bio' => '',
                'foto' => 'Team18.webp',
            ],
            [
                'voornaam' => 'Mohamed',
                'naam' => 'El Ouahbi',
                'functie' => 'TANDARTSASSISTENT',
                'bio' => '',
                'foto' => 'Team19.webp',
            ],
            [
                'voornaam' => 'Lindsay',
                'naam' => 'Van De Walle',
                'functie' => 'TANDARTSASSISTENTE',
                'bio' => '',
                'foto' => 'Team21.webp',
            ],
            [
                'voornaam' => 'Therese',
                'naam' => 'Jatta',
                'functie' => 'ONDERHOUD',
                'bio' => '',
                'foto' => 'Team20.webp',
            ],
        ];

        foreach ($teamMembers as $member) {
            Personeel::create($member);
        }
    }
}
