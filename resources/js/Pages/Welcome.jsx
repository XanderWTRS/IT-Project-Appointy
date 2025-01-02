import { Head} from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';
import BehandelingenCard from '/resources/js/Components/BehandelingCard';
import BackToTop from '/resources/js/Components/BackToTop';
import Chatbot from '/resources/js/Components/Chatbot';
import FlipCard from '/resources/js/Components/FlipCard';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [teamIds, setTeamIds] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchTeamIds = async () => {
            try {
                const response = await axios.get('/team-ids');
                setTeamIds(response.data);
            } catch (error) {
                console.error('Failed to fetch team IDs:', error);
            }
        };

        fetchTeamIds();
    }, []);

    const visibleCards = showAll ? teamIds : teamIds.slice(0, 4);
    return (
        <>
            <Head title="Home" />
            <div className="font-sans">
            <Header auth={auth} />

                {/* Hero Section */}
                <main
                    className="relative bg-gray-100 min-h-[80vh] flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: `url('/Assets/IMG/Hero.png')` }}
                >
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="relative container mx-auto py-32 px-6 text-white text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Tandartsen Praktijk Liedent
                        </h1>
                        <p className="text-md md:text-lg font-light mb-10">
                            Tandheelkunde - Orthodontie - Endodontie - Parodontologie
                        </p>
                        <a
                            href="/afspraak-selectie"
                            className="bg-blue-600 text-white py-3 px-6 rounded-3xl hover:bg-blue-500 transition"
                        >
                            Afspraak Maken
                        </a>
                    </div>
                </main>

                <BackToTop />

                {/* Behandelingen Section */}
                <section id='behandelingen' className="container mx-auto py-8 px-4 md:px-8 mb-40">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-8 next-section mt-16">
                        Behandelingen
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                        {/* Tandheelkunde Card */}
                        <div className="flex flex-col bg-white rounded-lg shadow-md p-4 text-center relative h-full">
                            <img src="/Assets/Icons/tandheelkunde.png" alt="Tandheelkunde" className="w-16 mx-auto mb-4" />
                            <h3 className="text-lg font-bold mb-2">Tandheelkunde</h3>
                            <p className="text-sm text-gray-600 flex-grow mb-10">
                                De algemene tandheelkunde wordt in onze praktijk uitgevoerd door tandartsen en mondhygiënisten.
                            </p>
                            <a className="bg-blue-500 text-white w-16 h-16 rounded-full shadow hover:bg-blue-600 flex justify-center items-center text-3xl absolute bottom-[-32px] left-1/2 transform -translate-x-1/2 transition-transform duration-500 hover:rotate-180" href="/tandheelkunde">+</a>
                        </div>

                        {/* Orthodontie Card */}
                        <div className="flex flex-col bg-white rounded-lg shadow-md p-4 text-center relative h-full">
                            <img src="/Assets/Icons/orthodontie.png" alt="Orthodontie" className="w-16 mx-auto mb-4" />
                            <h3 className="text-lg font-bold mb-2">Orthodontie</h3>
                            <p className="text-sm text-gray-600 flex-grow mb-10">
                                Orthodontie is een specialisme in de tandheelkunde dat zich bezighoudt met het optimaliseren van de stand
                                van tanden in de kaken door middel van beugels.
                            </p>
                            <a className="bg-blue-500 text-white w-16 h-16 rounded-full shadow hover:bg-blue-600 flex justify-center items-center text-3xl absolute bottom-[-32px] left-1/2 transform -translate-x-1/2 transition-transform duration-500 hover:rotate-180" href="/orthodontie">+</a>
                        </div>

                        {/* Endodontie Card */}
                        <div className="flex flex-col bg-white rounded-lg shadow-md p-4 text-center relative h-full">
                            <img src="/Assets/Icons/endondontie.png" alt="Endodontie" className="w-16 mx-auto mb-4" />
                            <h3 className="text-lg font-bold mb-2">Endodontie</h3>
                            <p className="text-sm text-gray-600 flex-grow mb-10">
                                Cariës, een trauma of een diepe vulling kunnen de tandzenuw of pulpa aantasten. Als gevolg daarvan kan
                                het pulpaweefsel ontsteken (pulpitis) en tandpijn veroorzaken.
                            </p>
                            <a className="bg-blue-500 text-white w-16 h-16 rounded-full shadow hover:bg-blue-600 flex justify-center items-center text-3xl absolute bottom-[-32px] left-1/2 transform -translate-x-1/2 transition-transform duration-500 hover:rotate-180" href="/endodontie">+</a>
                        </div>

                        {/* Parodontologie Card */}
                        <div className="flex flex-col bg-white rounded-lg shadow-md p-4 text-center relative h-full">
                            <img src="/Assets/Icons/paradontologie.png" alt="Parodontologie" className="w-16 mx-auto mb-4" />
                            <h3 className="text-lg font-bold mb-2">Parodontologie</h3>
                            <p className="text-sm text-gray-600 flex-grow mb-10">
                                In de paradontologie legt men zich toe op het behandelen van ontstoken tandvlees (gingivitis) en andere
                                weefsels rond de tand (parodontitis).
                            </p>
                            <a className="bg-blue-500 text-white w-16 h-16 rounded-full shadow hover:bg-blue-600 flex justify-center items-center text-3xl absolute bottom-[-32px] left-1/2 transform -translate-x-1/2 transition-transform duration-500 hover:rotate-180" href="/paradontologie">+</a>
                        </div>
                    </div>
                </section>


                {/* Team Section */}
                <section
                    id="team"
                    className={`container mx-auto py-8 px-4 md:px-8`}
                    style={{ marginBottom: '2rem' }} // Add spacing at the bottom
                >
                    {/* Section Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-8">
                        Team
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                    </h1>

                    {/* Cards Container */}
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
                        style={{
                            justifyItems: 'center', // Centreert de cards horizontaal
                        }}
                    >
                        {/* Dynamisch Renderen van FlipCards */}
                        {visibleCards.map((id) => (
                            <FlipCard key={id} id={id} />
                        ))}
                    </div>

                    {/* Show More / Less Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'Minder Weergeven' : 'Meer Weergeven'}
                        </button>
                    </div>

                    {/* Styling uitleg toevoegen */}
                    <style jsx>{`
                        @media (max-width: 640px) {
                            #team h1 {
                                text-align: center; /* Centreert de titel op kleine schermen */
                            }
                            #team .grid {
                                padding: 0 10px; /* Zorgt voor padding rond de grid */
                            }
                        }
                    `}</style>
                </section>

                {/* Contact Section */}
                <section
                    id='contact'
                    className="container mx-auto py-8 px-6 mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-8">
                        Contact
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <div className="text-gray-800">
                            <h2 className="text-2xl font-bold mb-4">TANDARTSENPRAKTIJK LIDENT</h2>
                            <p className="text-lg mb-2"><span role="img" aria-label="location">📍</span> Molenstraat 101 - 1770 Liedekereke</p>
                            <p className="text-lg mb-2">
                                <span role="img" aria-label="phone">📞</span>
                                <a href="tel:+3253667505" className="text-blue-500 hover:underline">053 66 75 05</a>
                            </p>
                            <p className="text-lg mb-2">
                                <span role="img" aria-label="fax">📠</span>
                                053 66 67 55
                            </p>
                            <p className="text-lg mb-2">
                                <span role="img" aria-label="email">✉️</span>
                                <a href="mailto:info@liedent.be" className="text-blue-500 hover:underline">info@liedent.be</a>
                            </p>
                            <p className="text-lg">
                                <span role="img" aria-label="clock">🕒</span>
                                MA-VRIJ:
                                <span className="text-blue-500"> 08:00 - 17:00</span><br />
                                <span className='ml-6'>ZAT-ZON:</span>
                                <span className="text-blue-500"> GESLOTEN</span>
                            </p>
                        </div>
                        <div className="w-full h-64 md:h-96">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2593.1207553197914!2d4.086879012044736!3d50.8733780567043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3bc14a1e0b521%3A0x757a4bd34bb46020!2sDental%20clinic%20Liedent!5e1!3m2!1sen!2sbe!4v1733840461688!5m2!1sen!2sbe"
                                width="100%"
                                height="100%"
                                style={{ border: '0' }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </section>


                {/* ContactUs Section */}
                <section
                    id="contacteer-ons"
                    className="container mx-auto py-4 px-6 mb-20"
                    style={{ minHeight: '75vh', marginBottom: '1rem' }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 mt-4">
                        Contacteer ons
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                    </h1>

                {/* Contact Form */}
                <form method="POST" action="/contact" className="grid grid-cols-1 gap-6" style={{ width: '75vw' }}>
                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />

                    {/* Name and Surname */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            name="naam"
                            placeholder="Naam"
                            required
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        <input
                            type="text"
                            name="achternaam"
                            placeholder="Achternaam"
                            required
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>

                    {/* Street and Postcode */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            name="straat"
                            placeholder="Straat"
                            required
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        <input
                            type="text"
                            name="postcode"
                            placeholder="Postcode"
                            required
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>

                    {/* Municipality and Phone */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            name="gemeente"
                            placeholder="Gemeente"
                            required
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        <input
                            type="text"
                            name="telefoon"
                            placeholder="Telefoon"
                            required
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        required
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />

                    {/* Question */}
                    <textarea
                        name="vraag"
                        placeholder="Uw vraag"
                        required
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        rows="5"
                    ></textarea>

                    {/* Privacy Checkbox and Submit Button */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 -mt-4">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="privacy" name="privacy_policy" required className="mr-2" />
                            <label htmlFor="privacy" className="text-sm text-gray-600">
                                Ik heb de privacy policy gelezen en ga akkoord
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                            style={{ width: '400px' }}
                        >
                            Verstuur vraag
                        </button>
                    </div>
                </form>
                </section>

                {/* Wachtdienst Section */}
                <section id="wachtdienst" className="container mx-auto py-4 px-6 mb-14">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 mt-4">
                        Wachtdienst
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                    </h1>

                    {/* Wachtdienst Sections */}
                    <div className="space-y-6"> {/* Increased spacing */}
                        {/* General Dentistry */}
                        <div className="bg-white p-4 rounded-md shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-600">Algemene tandheelkunde</h3>
                                <p className="text-gray-600">
                                    Voor alle Vlaamse provincies via het centrale nummer{' '}
                                    <a href="tel:+32090339969" className="text-blue-600 hover:underline">
                                        0903 39969 (€ 1.50/minuut)
                                    </a>{' '}
                                    op zaterdag, zon- en feestdagen van 9:00 tot 18:00 uur.
                                </p>
                            </div>
                            <div className="text-blue-600">
                                <a href="tel:+32090339969">
                                    <img src="/Assets/Icons/GSM.svg" className="w-12" alt="Call" />
                                </a>
                            </div>
                        </div>

                        {/* Orthodontics */}
                        <div className="bg-white p-4 rounded-md shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-600">Orthodontie</h3>
                                <p className="text-gray-600">
                                    Centraal oproepnummer{' '}
                                    <a href="tel:+32070222088" className="text-blue-600 hover:underline">
                                        070 222088
                                    </a>{' '}
                                    op zaterdag, zon- en feestdagen van 10:00 tot 12:00 uur.
                                </p>
                            </div>
                            <div className="text-blue-600">
                                <a href="tel:+32070222088">
                                    <img src="/Assets/Icons/GSM.svg" className="w-12" alt="Call" />
                                </a>
                            </div>
                        </div>

                        {/* Periodontics */}
                        <div className="bg-white p-4 rounded-md shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-600">Parodontologie</h3>
                                <p className="text-gray-600">
                                    Centraal oproepnummer{' '}
                                    <a href="tel:+32070222225" className="text-blue-600 hover:underline">
                                        070 222125
                                    </a>{' '}
                                    op zaterdag, zon- en feestdagen van 10:00 tot 12:00 uur en van 16:00 tot 18:00 uur.
                                </p>
                            </div>
                            <div className="text-blue-600">
                                <a href="tel:+32070222225">
                                    <img src="/Assets/Icons/GSM.svg" className="w-12" alt="Call" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                    <section id="chatbot" className="fixed bottom-4 right-4 z-50">
                        <Chatbot />
                    </section>
                <Footer />
            </div>
        </>
    );
}
