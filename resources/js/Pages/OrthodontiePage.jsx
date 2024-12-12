import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';

export default function OrthodontiePage() {
    return (
        <div className="bg-white text-gray-900">
            <Head title="Orthodontie" />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Orthodontie section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
                    <div>
                        <img
                            src="/Assets/IMG/orthodontie1.png"
                            alt="Orthodontie"
                            className="rounded-md shadow-md w-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4 text-blue-700">Orthodontie</h1>
                        <p className="mb-6">
                            Orthodontie is het medisch specialisme dat zich bezighoudt met het gebit van de mens, de tanden en kiezen en de aandoeningen die daarmee gepaard kunnen gaan. De orthodontist is de medisch specialist die zich bezighoudt met de preventie, diagnostiek en behandeling van aandoeningen van het gebit.
                        </p>
                        <button className="bg-blue-600 text-white py-3 px-6 rounded-3xl hover:bg-blue-500">
                            Afspraak maken
                        </button>
                    </div>
                </section>

                {/* Additional Information */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-gray-500 px-6 py-4 rounded-3xl text-white mb-10">
                        <div>
                            <p className="mb-3">
                                Tijdig een eerste afspraak maken met de orthodontist voor een diagnose is essentieel. Dit geldt vooral als er sprake is van scheefstand van tanden of een abnormale groei van de kaak.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Soorten Orthodontische Afwijkingen */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold mb-6 text-blue-700">Soorten Orthodontische Afwijkingen</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-blue-500">Kaakafwijkingen</h3>
                            <p className="mb-4">
                                Ontstaan door verkeerde groei van de kaken, zoals te weinig of te veel groei van de onderkaak, of asymmetrische groei (links/rechts), wat het gezicht uit balans kan brengen.
                            </p>
                            <h3 className="text-xl font-semibold mb-2 text-blue-500">Gebitsafwijkingen</h3>
                            <p className="mb-4">
                                Ontstaan door een onregelmatige tandstand. Er kan bijvoorbeeld te weinig ruimte zijn, waardoor tanden overlappen, of juist te veel ruimte, wat spleten veroorzaakt. Ook kunnen tanden ontbreken.
                            </p>
                            <p className="mb-4">
                                Bij veel patiënten komt een combinatie van kaak- en gebitsafwijkingen voor.
                            </p>
                        </div>
                        <div>
                            <img
                                src="/Assets/IMG/orthodontie2.png"
                                alt="Soorten orthodontische afwijkingen"
                                className="rounded-md shadow-md w-full"
                            />
                        </div>
                    </div>
                </section>


                {/* Behandeling en Na de Behandeling */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-blue-700">Behandeling</h3>
                        <p className="text-gray-700">
                        Afhankelijk van de soort uit te voeren behandeling zal men kiezen tussen uitneembare beugels of vaste beugels of een combinatie van beide. Voorbeelden van uitneembare beugels zijn expansieplaat, bionator…

                        Voorbeelden van vaste beugels zijn quadhelix, distalisatieboog, blokjes…

                        Voor de ‘blokjes’ of de vaste apparatuur werken we zowel met metalen als met ceramische blokjes.

                        Ook kan u bij ons terecht voor het incognito systeem, zijnde blokjes aan de binnenkant van de tanden.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-blue-700">Na de behandeling</h3>
                        <p className="text-gray-700">
                            De retentiefase wordt ook wel de periode van passieve behandeling genoemd. Deze fase begint op het moment dat de actieve tandverplaatsing afgesloten wordt.

                            Deze laatste periode is ervoor bedoeld om de tanden en kiezen na de behandeling zo goed mogelijk in de gecorrigeerde stand vast te laten groeien. Uitneembare retentieapparatuur kan op termijn (geleidelijk) worden verminderd. Vaste retentieapparatuur (retentiedraad) wordt meestal lang gehandhaafd.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}