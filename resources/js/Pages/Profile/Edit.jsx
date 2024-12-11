import React from 'react';
import AuthenticatedLayout from '/resources/js/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


export default function Edit({ mustVerifyEmail, status, user }) {
    const { data, setData, put, processing, errors } = useForm({
        email: user.email || '',
        password: '',
        voornaam: user.voornaam || '',
        naam: user.naam || '',
        geboortedatum: user.geboortedatum || '',
        mutualiteit: user.mutualiteit || '',
        rijksregister_nr: user.rijksregister_nr || '',
        tandarts: user.tandarts || '',
        gsm_nummer: user.gsm_nummer || '',
        datum_registratie: user.datum_registratie || '',
        keuze_sms: user.keuze_sms || '',
        keuze_email: user.keuze_email || '',
        betaald: user.betaald ? true : false,
    });

    const submit = (e) => {
        e.preventDefault();
        window.alert('Formulier is verstuurd');
        put(route('profile.update'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profiel Aanpassen
                </h2>
            }
        >
            <Head title="Profiel Aanpassen" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {status && (
                        <div className="mb-4 text-green-600">
                            {status}
                        </div>
                    )}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <form onSubmit={submit} className="max-w-xl">
                            {/* Voornaam */}
                            <div className="mt-4">
                                <label htmlFor="voornaam" className="block font-medium text-gray-700">
                                    Voornaam
                                </label>
                                <input
                                    id="voornaam"
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.voornaam}
                                    onChange={e => setData('voornaam', e.target.value)}
                                />
                                {errors.voornaam && <div className="text-red-600">{errors.voornaam}</div>}
                            </div>

                            {/* Naam */}
                            <div className="mt-4">
                                <label htmlFor="naam" className="block font-medium text-gray-700">
                                    Naam
                                </label>
                                <input
                                    id="naam"
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.naam}
                                    onChange={e => setData('naam', e.target.value)}
                                />
                                {errors.naam && <div className="text-red-600">{errors.naam}</div>}
                            </div>

                            {/* Email */}
                            <div className="mt-4">
                                <label htmlFor="email" className="block font-medium text-gray-700">
                                    E-mail
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                                {errors.email && <div className="text-red-600">{errors.email}</div>}
                            </div>

                            {/* Password (optioneel) */}
                            <div className="mt-4">
                                <label htmlFor="password" className="block font-medium text-gray-700">
                                    Wachtwoord (optioneel)
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                />
                                {errors.password && <div className="text-red-600">{errors.password}</div>}
                            </div>

                            {/* Geboortedatum */}
                            <div className="mt-4">
                                <label htmlFor="geboortedatum" className="block font-medium text-gray-700">
                                    Geboortedatum
                                </label>
                                <input
                                    id="geboortedatum"
                                    type="date"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.geboortedatum || ''}
                                    onChange={e => setData('geboortedatum', e.target.value)}
                                />
                                {errors.geboortedatum && <div className="text-red-600">{errors.geboortedatum}</div>}
                            </div>

                            {/* Mutualiteit */}
                            <div className="mt-4">
                                <label htmlFor="mutualiteit" className="block font-medium text-gray-700">
                                    Mutualiteit
                                </label>
                                <input
                                    id="mutualiteit"
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.mutualiteit}
                                    onChange={e => setData('mutualiteit', e.target.value)}
                                />
                                {errors.mutualiteit && <div className="text-red-600">{errors.mutualiteit}</div>}
                            </div>

                            {/* Rijksregister Nummer */}
                            <div className="mt-4">
                                <label htmlFor="rijksregister_nr" className="block font-medium text-gray-700">
                                    Rijksregister Nummer
                                </label>
                                <input
                                    id="rijksregister_nr"
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.rijksregister_nr}
                                    onChange={e => setData('rijksregister_nr', e.target.value)}
                                />
                                {errors.rijksregister_nr && <div className="text-red-600">{errors.rijksregister_nr}</div>}
                            </div>

                            {/* Tandarts */}
                            <div className="mt-4">
                                <label htmlFor="tandarts" className="block font-medium text-gray-700">
                                    Tandarts
                                </label>
                                <input
                                    id="tandarts"
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.tandarts}
                                    onChange={e => setData('tandarts', e.target.value)}
                                />
                                {errors.tandarts && <div className="text-red-600">{errors.tandarts}</div>}
                            </div>

                            {/* GSM Nummer */}
                            <div className="mt-4">
                                <label htmlFor="gsm_nummer" className="block font-medium text-gray-700">
                                    GSM Nummer
                                </label>
                                <input
                                    id="gsm_nummer"
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.gsm_nummer}
                                    onChange={e => setData('gsm_nummer', e.target.value)}
                                />
                                {errors.gsm_nummer && <div className="text-red-600">{errors.gsm_nummer}</div>}
                            </div>

                            {/* Datum registratie */}
                            <div className="mt-4">
                                <label htmlFor="datum_registratie" className="block font-medium text-gray-700">
                                    Datum Registratie
                                </label>
                                <input
                                    id="datum_registratie"
                                    type="date"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.datum_registratie || ''}
                                    onChange={e => setData('datum_registratie', e.target.value)}
                                />
                                {errors.datum_registratie && <div className="text-red-600">{errors.datum_registratie}</div>}
                            </div>

                            {/* Keuze SMS */}
                            <div className="mt-4">
                                <label htmlFor="keuze_sms" className="block font-medium text-gray-700">
                                    Keuze SMS
                                </label>
                                <input
                                    id="keuze_sms"
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.keuze_sms}
                                    onChange={e => setData('keuze_sms', e.target.value)}
                                />
                                {errors.keuze_sms && <div className="text-red-600">{errors.keuze_sms}</div>}
                            </div>

                            {/* Keuze Email */}
                            <div className="mt-4">
                                <label htmlFor="keuze_email" className="block font-medium text-gray-700">
                                    Keuze Email
                                </label>
                                <input
                                    id="keuze_email"
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.keuze_email}
                                    onChange={e => setData('keuze_email', e.target.value)}
                                />
                                {errors.keuze_email && <div className="text-red-600">{errors.keuze_email}</div>}
                            </div>

                            {/* Betaald */}
                            <div className="mt-4 flex items-center">
                                <input
                                    id="betaald"
                                    type="checkbox"
                                    className="mr-2"
                                    checked={data.betaald}
                                    onChange={e => setData('betaald', e.target.checked)}
                                />
                                <label htmlFor="betaald" className="font-medium text-gray-700">
                                    Betaald
                                </label>
                                {errors.betaald && <div className="text-red-600 ml-2">{errors.betaald}</div>}
                            </div>

                            {mustVerifyEmail && (
                                <div className="mt-4 text-yellow-600">
                                    Je moet je email adres nog verifiëren.
                                </div>
                            )}

                            <div className="mt-6">
                                {/* Deze knop verstuurt het formulier naar de database */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Update Profiel
                                </button>
                            </div>

                            {status && (
                                <div className="mt-4 text-green-600">
                                    {status}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
