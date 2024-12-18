import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';

export default function AfspraakRegelement() {
    return (
        <div className="bg-white text-gray-900">
            <Head title="AfspraakRegelement" />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-6">
                    Afspraak Reglement
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                </h1>

                {/* Niet opdagen 1ste keer */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Niet opdagen 1ste keer</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Indien u niet komt opdagen voor uw geplande afspraak zal er een boete (per post) worden gestuurd naar u.
                    Voor behandelingen van <span className="text-blue-600 font-bold">-1u</span> bedraagt de boete <span className="text-blue-600 font-bold">€25</span>.
                    Voor behandelingen van <span className="text-blue-600 font-bold">+1u</span> bedraagt de boete <span className="text-blue-600 font-bold">€50</span>.
                </p>

                {/* Geldige reden */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Geldige reden</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Moest u een geldige reden hebben van uw afwezigheid op de afspraak, kan u bellen naar de praktijk en zal de boete wegvallen.
                </p>

                {/* Boete niet betalen */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Boete niet betalen</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    <a
                        href="#"
                        className="text-blue-500 underline hover:text-blue-600 transition duration-300"
                    >
                        Als u uw boete niet wilt betalen, dan zal u de mogelijkheid om afspraken te maken verliezen. U kan weer afspraken maken zodra u uw boete betaalt.
                    </a>
                </p>

                {/* 3de keer niet opdagen */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">3de keer niet opdagen</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Als u 3 keer niet komt opdagen op uw afspraken zal uw account worden opgeschort (verbannen). Dit wil zeggen dat uw geen afspraken meer kan maken bij de praktijk.
                    <span className="font-semibold"> Dit kan ook niet ongedaan worden gemaakt!</span>
                </p>
            </main>


            <Footer />
        </div>
    );
}
