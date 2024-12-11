import { Head } from '@inertiajs/react';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';
import BehandelingenCard from '/resources/js/Components/BehandelingCard';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Home" />
            <div className="font-sans">
            <Header auth={auth} />

                {/* Hero Section */}
                <main
                    className="relative bg-gray-100 h-[70vh]"
                    style={{
                        backgroundImage: `url('/Assets/IMG/Hero.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="relative container mx-auto py-32 px-6 text-white text-center">
                        <h1 className="text-6xl font-bold mb-4">
                            Tandartsen Praktijk Liedent
                        </h1>
                        <p className="text-lg font-light mb-10">
                            Tandheelkunde - Orthodontie - Endodontie - Parodontologie
                        </p>
                        <a
                            href="#appointment"
                            className="bg-blue-600 text-white py-3 px-6 rounded-3xl hover:bg-blue-500"
                        >
                            Afspraak Maken
                        </a>
                    </div>
                </main>

                {/* Kaarten */}
                <section className="container mx-auto justify-between items-center py-4 px-8" style={{ height: '75vh' }}>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 mt-4">
                        Behandelingen
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Tandheelkunde */}
                        <BehandelingenCard
                            afb={"/Assets/Icons/tandheelkunde.png"}
                            title={"Tandheelkunde"}
                            description={"De algemene tandheelkunde wordt in onze praktijk uitgevoerd door tandartsen en mondhygiënisten."}
                            route="/tandheelkunde"/>

                        {/* Orthodontie */}
                        <BehandelingenCard
                            afb={"/Assets/Icons/orthodontie.png"}
                            title={"Orthodontie"}
                            description={"Orthodontie is een specialisme in de tandheelkunde dat zich bezighoudt met het optimaliseren van de stand van tanden in de kaken door middel van beugels."}
                            route="/orthodontie"/>

                        {/* Endodontie */}
                        <BehandelingenCard
                            afb={"/Assets/Icons/endondontie.png"}
                            title={"Endodontie"}
                            description={"Cariës, een trauma of een diepe vulling kunnen de tandzenuw of pulpa aantasten. Als gevolg daarvan kan het pulpaweefsel ontsteken (pulpitis) en tandpijn veroorzaken."}
                            route="/endodontie"/>

                        {/* Paradontologie */}
                        <BehandelingenCard
                            afb={"/Assets/Icons/paradontologie.png"}
                            title={"Parodontologie"}
                            description={"In de paradontologie legt men zich toe op het behandelen van ontstoken tandvlees (gingivitis) en andere weefsels rond de tand (parodontitis)."}
                            route="/paradontologie"/>
                    </div>
                    </section>

                    {/* Team Section */}
                    <section className="container mx-auto justify-between items-center py-4 px-6" style={{ height: '75vh' }}>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 mt-4">
                        Team
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                    </h1>
                    </section>


                    <section className="container mx-auto justify-between items-center py-4 px-6" style={{ height: '75vh' }}>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 mt-4">
                            Contact
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
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
                                <span className="text-blue-500"> 08:00 - 17:00</span><br></br>
                                <span className='ml-6'>ZAT-ZON:</span>
                                <span className="text-blue-500"> GESLOTEN</span>
                            </p>
                        </div>

                            <div className="w-full h-full">
                                {/* Embedding Google Maps */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2593.1207553197914!2d4.086879012044736!3d50.8733780567043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3bc14a1e0b521%3A0x757a4bd34bb46020!2sDental%20clinic%20Liedent!5e1!3m2!1sen!2sbe!4v1733840461688!5m2!1sen!2sbe"
                                    width="100%"
                                    height="200%"
                                    style={{ border: '0' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </section>

                    {/* ContactUs Section */}
                    <section className="container mx-auto py-4 px-6" style={{ height: '75vh'}}>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 mt-4">
                            Contacteer ons
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                        </h1>

                        {/* Contact Form */}
                        <div className="grid grid-cols-1 gap-6" style={{width: '75vw'}}>
                            {/* Name and Surname */}
                            <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Naam"
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Achternaam"
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            </div>

                            {/* Street and Postcode */}
                            <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Straat"
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Postcode"
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            </div>

                            {/* Municipality and Phone */}
                            <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Gemeente"
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <input
                                type="text"
                                placeholder="Telefoon"
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            </div>

                            {/* Email */}
                            <input
                            type="email"
                            placeholder="E-mail"
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />

                            {/* Question */}
                            <textarea
                            placeholder="Uw vraag"
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            rows="5"
                            ></textarea>

                            {/* Privacy Checkbox and Submit Button */}
                            <div className="flex items-center justify-between gap-2 -mt-4">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="privacy" className="mr-2" />
                                <label htmlFor="privacy" className="text-sm text-gray-600">
                                Ik heb de privacy policy gelezen en ga akkoord
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" style={{ width: '400px' }}>
                                Verstuur vraag
                            </button>
                            </div>

                        </div>
                        </section>


                    {/* Wachtdienst Section */}
                    <section className="container mx-auto py-4 px-6 mb-14">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 mt-4">
                            Wachtdienst
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                        </h1>

                        {/* Wachtdienst Sections */}
                        <div className="space-y-4">
                            {/* General Dentistry */}
                            <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-600">Algemene tandheelkunde</h3>
                                <p className="text-gray-600">
                                Voor alle Vlaamse provincies via het centrale nummer{' '}
                                <a href="tel:+32090339969" className="text-blue-600 hover:underline">
                                    0903 39969 (€ 1.50/minuut)
                                </a>{' '}
                                op zaterdag, zon- en feestdagen van 9:00 tot 18:00 uur.
                                </p>
                                <p className="text-gray-600">
                                Voor de zones 052 / 053 / 054 via het gratis nummer{' '}
                                <a href="tel:+32053709095" className="text-blue-600 hover:underline">
                                    053 709095
                                </a>{' '}
                                op zaterdag van 14:00 tot 18:00 uur, op zon- en feestdagen van 9:00 tot 12:00 uur.
                                </p>
                                <p className="text-gray-600">
                                Voor de provincie Oost-Vlaanderen, Antwerpen via het centrale nummer{' '}
                                <a href="tel:+32090444333" className="text-blue-600 hover:underline">
                                    0904 44333 (€2 euro/minuut)
                                </a>{' '}
                                op zaterdag, zon- en feestdagen 9:00 – 18:00 uur.
                                </p>
                            </div>
                            <div className="text-blue-600">
                                <a href="tel:+32090339969">
                                <img src="/Assets/Icons/GSM.svg" className="w-12" alt="Call" />
                                </a>
                            </div>
                            </div>

                            {/* Orthodontics */}
                            <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
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
                            <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
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

                <Footer />
            </div>
        </>
    );
}
