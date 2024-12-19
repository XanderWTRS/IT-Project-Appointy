import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';

export default function AfspraakOptiePage() {
    const handlePhoneCall = () => {
        window.location.href = 'tel:053667505';
    };

    const handleOnlineAppointment = () => {
        window.location.href = '/payment';
    };

    return (
        <div className="bg-white text-gray-900">
            <Head title="Afspraak keuze" />
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Afspraak vastleggen */}
                <section id="afspraak-vastleggen" className="container mx-auto py-8 px-6 max-w-md bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative mb-12 mt-4 text-center">
                        Afspraak vastleggen
                        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-full h-1 bg-blue-500"></span>
                    </h1>

                    <div className="flex flex-col items-center space-y-6">
                        {/* Via telefoon */}
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-lg font-semibold text-gray-700">Via telefoon</span>
                            <button
                                onClick={handlePhoneCall}
                                className="flex items-center justify-center w-64 px-6 py-3 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h4.019a2.25 2.25 0 012.128 1.59l.664 2.327a2.25 2.25 0 01-1.285 2.684l-.956.382a11.959 11.959 0 005.682 5.682l.382-.956a2.25 2.25 0 012.684-1.285l2.327.664a2.25 2.25 0 011.59 2.128v4.019a2.25 2.25 0 01-2.25 2.25h-.75C6.798 21.75 2.25 13.107 2.25 6.75v-.75a2.25 2.25 0 012.25-2.25z" />
                                </svg>
                                053 66 75 05
                            </button>
                        </div>

                        <span className="text-lg font-bold text-gray-700">OF</span>

                        {/* Online afspraak */}
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-lg font-semibold text-gray-700">Online afspraak</span>
                            <button
                                onClick={handleOnlineAppointment}
                                className="flex items-center justify-center w-64 px-6 py-3 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25 8.25-3.694 8.25-8.25-3.694-8.25-8.25-8.25zm0 14.25a6 6 0 100-12 6 6 0 000 12z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v3.75l2.25 2.25" />
                                </svg>
                                Afspraak vastleggen
                            </button>
                            <span className="text-sm text-red-500">(enkel voor 1ste consultatie)</span>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
