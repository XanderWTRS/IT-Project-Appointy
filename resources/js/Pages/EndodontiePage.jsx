

import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';

export default function EndodontiePage() {
    return (
        <div className="bg-white text-gray-900">
            <Head title="Endodontie" />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  
                {/* Endodontie section */}
                <section className="mb-16">
                    <div className="flex flex-row justify-between items-start">
                        <div className="flex-1">
                            <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Endodontie</h1>
                            <p className="mb-6 leading-relaxed text-gray-700 text-lg">
                                Cariës, een trauma of een diepe vulling kunnen de tandzenuw of pulpa aantasten. Als gevolg
                                daarvan kan het pulpaweefsel ontsteken (pulpitis) en tandpijn veroorzaken. Of de pulpa kan
                                afsterven (necrose), wat vaak onopgemerkt gebeurt. Het met bacteriën besmette wortelkanaal zal
                                uiteindelijk een ontsteking veroorzaken aan de wortelpunt in het kaakbot. <a href="#" className="text-blue-500 underline">Daaruit kan later een abces of cyste ontstaan.</a>
                            </p>
                            <button className="bg-blue-600 text-white py-3 px-6 rounded-3xl hover:bg-blue-500 text-lg">
                                Afspraak maken
                            </button>
                        </div>
                        <div className="flex flex-col space-y-4 ml-6">
                            <img
                                src="https://cibqykkyna.cloudimg.io/liedent.be/wp-content/uploads/2019/05/endodontie2.jpg"
                                alt="Endodontie tools"
                                className="rounded-lg shadow-lg h-auto w-80"
                            />
                            <img
                                src="https://cibqykkyna.cloudimg.io/liedent.be/wp-content/uploads/2019/05/endodontie23.jpg"
                                alt="Endodontie accessory"
                                className="rounded-lg shadow-lg h-auto w-80"
                            />
                        </div>
                    </div>
                </section>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-gray-500 px-6 py-4 rounded-3xl text-white">
                        <div>
                            <p className="mb-4">
                                Wanneer tanden verloren gegaan zijn kan men deze vervangen door implantaten. Op implantaten kunnen
                                diverse uitneembare of vaste prothesen geplaatst worden.
                            </p>
                        </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
