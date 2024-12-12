import { Head } from '@inertiajs/react';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';
import React from 'react';

export default function ParadontologiePage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
            <Head title="Paradontologie" />
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Hero Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-4xl font-bold text-blue-700 mb-4">Paradontologie</h1>
                        <p className="text-gray-700 mb-6">
                            In de paradontologie legt men zich toe op het behandelen van ontstoken tandvlees
                            (gingivitis) en andere weefsels rond de tand (parodontitis) en het corrigeren van defecten
                            na genezing hiervan.
                        </p>
                        <p className="text-gray-700 mb-6">
                            De parodontoloog neemt ook de plaatsing van implantaten ter vervanging van ontbrekende
                            tanden op zich of haar rekening.
                        </p>
                        <button className="bg-blue-600 text-white py-3 px-6 rounded-3xl hover:bg-blue-500">
                            Afspraak maken
                        </button>
                    </div>
                    <div>
                        <img
                            src="/Assets/IMG/paradontologie.png"
                            alt="Paradontologie"
                            className="rounded-md shadow-md w-full"
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}