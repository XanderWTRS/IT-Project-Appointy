import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Dashboard({ auth }) {
    const user = auth.user;

    return (
        <>
            <Head title="Dashboard" />
            <div className="font-sans">
                <Header auth={auth} />

                <div className="flex">
                    {/* Sidebar */}
                    <aside className="w-1/4 bg-gray-100 h-screen p-4">
                        <nav>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-2">
                                    <span className="text-xl">👤</span>
                                    <a href="#" className="text-lg font-medium">
                                        Profiel
                                    </a>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-xl">📅</span>
                                    <a href="#" className="text-lg font-medium">
                                        Afspraken
                                    </a>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-xl">🔔</span>
                                    <a href="#" className="text-lg font-medium">
                                        Meldingen
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-8">
                        {/* Profile Section */}
                        <section>
                            <h1 className="text-3xl font-bold mb-6">Profiel</h1>
                            <div className="bg-white rounded-lg shadow p-6">
                                {/* Profile Header */}
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {user.voornaam} {user.naam}
                                        </h2>
                                        <p className="text-gray-600">{user.email}</p>
                                    </div>
                                    
                                </div>

                                {/* Profile Form */}
                                <form>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Voornaam
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user.voornaam}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Naam
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user.naam}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                defaultValue={user.email}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Geboortedatum
                                            </label>
                                            <input
                                                type="date"
                                                defaultValue={user.geboortedatum}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Mutualiteit
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user.mutualiteit}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Rijksregister Nr
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user.rijksregister_nr}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Tandarts
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user.tandarts}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                GSM-nummer
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user.gsm_nummer}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {/* Since datum_registratie is likely set when the user registers, you might make it read-only */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Datum registratie
                                            </label>
                                            <input
                                                type="date"
                                                defaultValue={user.datum_registratie}
                                                readOnly
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                SMS meldingen
                                            </label>
                                            <input
                                                type="checkbox"
                                                defaultChecked={user.keuze_sms}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Email meldingen
                                            </label>
                                            <input
                                                type="checkbox"
                                                defaultChecked={user.keuze_email}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Betaald
                                            </label>
                                            <input
                                                type="checkbox"
                                                defaultChecked={user.betaald}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            Opslaan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>

                        {/* Password Change Section */}
                        <section className="mt-8">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-bold mb-4">Wachtwoord wijzigen</h2>
                                <form>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Oud wachtwoord
                                            </label>
                                            <input
                                                type="password"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Nieuw wachtwoord
                                            </label>
                                            <input
                                                type="password"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Herhaal nieuw wachtwoord
                                            </label>
                                            <input
                                                type="password"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="wijzig wachtwoord"
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            Wijzig wachtwoord
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}
