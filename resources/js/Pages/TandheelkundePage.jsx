import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import React from 'react';

export default function TandheelkundePage() {
    return (
        <div className="bg-white text-gray-900">
            <Head title="Tandheelkunde" />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Algemene tandheelkunde section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
                    <div>
                        <img
                            src="/Assets/IMG/tandheelkunde1.png"
                            alt="Algemene tandheelkunde"
                            className="rounded-md shadow-md w-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Algemene tandheelkunde</h1>
                        <p className="mb-4">
                            De algemene tandheelkunde wordt in onze praktijk uitgevoerd door tandartsen en mondhygiënisten.
                        </p>
                        <h2 className="text-xl font-semibold mb-2">Preventie</h2>
                        <p className="mb-4">
                            Preventie blijft het allerbelangrijkste voor een optimale mondgezondheid. Een goede mondhygiëne en
                            regelmatige controles zijn onontbeerlijk. Wij helpen hier graag bij met een recall systeem en door
                            het instrueren van de juiste technieken voor een optimaal resultaat.
                        </p>
                        <h2 className="text-xl font-semibold mb-2">Conserverende tandheelkunde</h2>
                        <p className="mb-4">
                            Conserverende tandheelkunde omvat alles wat te maken heeft met het herstellen van defecten (meestal
                            tanderf) op een zo conserverend mogelijke manier. De vullingen zijn meestal van composiet, tenzij het
                            gaat om een voorlopige vulling of om een vulling uit glasionomeercement dat langzaam fluoride
                            afgeeft. Amalgaamvullingen (zilvervullingen) worden in onze praktijk niet meer gebruikt.
                        </p>
                        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Afspraak maken
                        </button>
                    </div>
                </section>

                {/* Kroon- en brugwerk / prothese section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6">Kroon- en brugwerk / prothese</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div>
                            <p className="mb-4">
                                Kronen en bruggen zijn bedoeld als duurzame vervangingen voor tanden en kiezen. Ze benaderen de
                                oorspronkelijke vorm en functie zoveel mogelijk.
                            </p>
                            <p className="mb-4">
                                Een kroon is een kapje van porselein dat precies over een afgeslepen tand of kies past. Het kapje
                                zit op de tand of kies vastgelijmd. Door een kroon krijgt de tand of kies zijn oorspronkelijke
                                vorm en functie weer terug.
                            </p>
                            <p className="mb-4">
                                Een brug wordt gemaakt ter vervanging van één of meer ontbrekende tanden en/of kiezen. Een brug
                                zit vast aan twee of meer pijlers. Dit zijn afgeslepen tanden of kiezen aan weerszijden van de
                                open ruimte van de ontbrekende tand of kies. Een brug bestaat uit twee of meer kronen die op deze
                                pijlers passen en een brugtussendeel, ook wel ‘pontic’ genoemd. Deze bestaat uit één of meer
                                kunsttanden en/of kiezen die op de plaats van de open ruimte komen.
                            </p>
                            <p className="mb-4">
                                Een plaat- of frameprothese, ook wel partiële prothese genoemd, is een vervanging van één of meer
                                tanden en kiezen. Als goede stabiele oplossing als de verloren tanden of kiezen niet door een
                                brug, kroon of implantaten kunnen vervangen worden. De prothese kan uit de mond genomen worden.
                                Kronen, bruggen en implantaten niet: zij zitten vast in de mond.
                            </p>
                            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                Afspraak maken
                            </button>
                        </div>
                        <div>
                            <img
                                src="/images/kroon-brugwerk.jpg"
                                alt="Kroon- en brugwerk / prothese"
                                className="rounded-md shadow-md w-full"
                            />
                        </div>
                    </div>
                </section>

                {/* Implantaten section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6">Implantaten</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="mb-4">
                                Wanneer tanden verloren gegaan zijn kan men deze vervangen door implantaten. Op implantaten kunnen
                                diverse uitneembare of vaste prothesen geplaatst worden.
                            </p>
                            <p className="mb-4">
                                Bij complexere implantaatbehandelingen wordt de patiënt doorverwezen naar onze maxillo-faciaal
                                chirurg Dr. Tom De Backer.
                            </p>
                            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                Afspraak maken
                            </button>
                        </div>
                        <div>
                            <img
                                src="/images/implantaten.jpg"
                                alt="Implantaten"
                                className="rounded-md shadow-md w-full"
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
