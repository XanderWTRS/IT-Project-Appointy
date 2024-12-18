import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';

export default function PrivacyPolicy() {
    return (
        <div className="bg-white text-gray-900">
            <Head title="PrivacyPolicy" />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-6">
                    Wat is GDPR/AVG?
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    General Data Protection Regulation (GDPR) of de Algemene Verordening Gegevensbescherming (AVG), die afdwingbaar is
                    sinds <span className="font-semibold">25 mei 2018</span>, heeft als doel de verwerking van persoonlijke gegevens te reguleren,
                    te beschermen en te beveiligen.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Persoonlijke gegevens</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Uw tandarts verzamelt, bewaart en verwerkt uw persoonlijke gegevens in het kader van <span className="font-semibold">gezondheidszorg</span>
                    en <span className="font-semibold">administratie</span> (mutualiteiten, RIZIV, boekhouding, doorverwijzing, dentaal technicus, vastleggen van afspraken, enz.).
                    Deze gegevens worden enkel gebruikt door bevoegde personen binnen de praktijk en administratieve partijen zoals mutualiteiten en RIZIV.
                    Bij gerechtigde redenen kunnen gegevens gedeeld worden met derde partijen.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Veiligheidsmaatregelen</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Uw tandarts verzekert dat alle nodige <span className="font-semibold">veiligheidsmaatregelen</span> getroffen zijn om uw persoonsgegevens maximaal te beschermen.
                    Gegevensdeling gebeurt uitsluitend met partijen waarmee een verwerkersovereenkomst is afgesloten, die de veiligheid van uw gegevens waarborgt.
                    De <span className="font-semibold">bewaartermijn</span> van de gegevens voldoet aan de AVG-wetgeving.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Deze privacyverklaring wordt steeds up-to-date gehouden en aangepast aan de vigerende AVG-regelgeving.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Rechten patiënten</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Patiënten kunnen ten allen tijde vragen om hun gegevens <span className="font-semibold">in te kijken</span>,
                    <span className="font-semibold">te wijzigen</span>, door te geven of te schrappen, mits gegronde redenen en zolang er geen conflicterende rechten of belangen bestaan.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Vragen?</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Een uitgebreide versie van deze privacyverklaring kan u inkijken bij de <span className="font-semibold">balie van de praktijk</span>.
                    Voor verdere vragen kunt u zich steeds wenden tot de verwerkingsverantwoordelijke.
                </p>
            </main>


            <Footer />
        </div>
    );
}
