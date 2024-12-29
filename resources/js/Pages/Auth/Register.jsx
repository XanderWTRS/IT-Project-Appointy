import React, { useState } from "react";
import InputError from '/resources/js/Components/InputError';
import InputLabel from '/resources/js/Components/InputLabel';
import PrimaryButton from '/resources/js/Components/PrimaryButton';
import TextInput from '/resources/js/Components/TextInput';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        voornaam: '',
        naam: '',
        email: '',
        geboortedatum: '',
        mutualiteit: '',
        rijksregister_nr: '',
        tandarts: '',
        gsm_nummer: '',
        datum_registratie: '',
        keuze_sms: false,
        keuze_email: false,
        password: '',
        password_confirmation: '',
    });

    const [checkboxError, setCheckboxError] = useState('');
    const [customErrors, setCustomErrors] = useState({});

    const validateBelgianPhoneNumber = (number) => {
        const regex = /^(?:\+32|0)(4\d{8}|[1-9]\d{8})$/;
        return regex.test(number);
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const submit = (e) => {
        e.preventDefault();

        let validationErrors = {};

        // Check if user is at least 18 years old
        if (!data.geboortedatum || calculateAge(data.geboortedatum) < 18) {
            validationErrors.geboortedatum = 'Je moet minstens 18 jaar oud zijn.';
        }

        // Validate Belgian phone number
        if (!validateBelgianPhoneNumber(data.gsm_nummer)) {
            validationErrors.gsm_nummer = 'Geef een geldig Belgisch telefoonnummer op.';
        }

        // Check if at least one communication option is selected
        if (!data.keuze_sms && !data.keuze_email) {
            setCheckboxError('Je moet minstens één communicatieoptie selecteren (SMS of Email).');
            return;
        } else {
            setCheckboxError('');
        }

        if (Object.keys(validationErrors).length > 0) {
            setCustomErrors(validationErrors);
            return;
        }

        // Reset custom errors and submit the form
        setCustomErrors({});
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
        <Head title="Nieuw account" />
        <Header />
        <div className="w-full h-screen white flex flex-col">
            <div className="flex flex-col justify-center items-center flex-grow bg-white mt-10 mb-20">
                <form
                    onSubmit={submit}
                    className="w-full max-w-4xl px-8 py-10 bg-gray-100 shadow-md rounded-md"
                >
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 -mt-4">
                            Nieuw Account
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                        </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="voornaam" value="Voornaam" />
                            <TextInput
                                id="voornaam"
                                name="voornaam"
                                value={data.voornaam}
                                className="mt-1 block w-full"
                                autoComplete="given-name"
                                onChange={(e) => setData('voornaam', e.target.value)}
                                required
                            />
                            <InputError message={errors.voornaam} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="naam" value="Naam" />
                            <TextInput
                                id="naam"
                                name="naam"
                                value={data.naam}
                                className="mt-1 block w-full"
                                autoComplete="family-name"
                                onChange={(e) => setData('naam', e.target.value)}
                                required
                            />
                            <InputError message={errors.naam} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="geboortedatum" value="Geboortedatum" />
                            <TextInput
                                id="geboortedatum"
                                type="date"
                                name="geboortedatum"
                                value={data.geboortedatum}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('geboortedatum', e.target.value)}
                                required
                            />
                            <InputError message={errors.geboortedatum || customErrors.geboortedatum} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="mutualiteit" value="Mutualiteit" />
                            <TextInput
                                id="mutualiteit"
                                name="mutualiteit"
                                value={data.mutualiteit}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('mutualiteit', e.target.value)}
                            />
                            <InputError message={errors.mutualiteit} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="rijksregister_nr" value="Rijksregister nummer" />
                            <TextInput
                                id="rijksregister_nr"
                                name="rijksregister_nr"
                                value={data.rijksregister_nr}
                                className="mt-1 block w-full"
                                maxLength="11"
                                onChange={(e) => setData('rijksregister_nr', e.target.value)}
                                required
                            />
                            <InputError message={errors.rijksregister_nr} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="tandarts" value="Tandarts" />
                            <TextInput
                                id="tandarts"
                                name="tandarts"
                                value={data.tandarts}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('tandarts', e.target.value)}
                            />
                            <InputError message={errors.tandarts} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="gsm_nummer" value="GSM-nummer" />
                            <TextInput
                                id="gsm_nummer"
                                name="gsm_nummer"
                                value={data.gsm_nummer}
                                className="mt-1 block w-full"
                                maxLength="15"
                                onChange={(e) => setData('gsm_nummer', e.target.value)}
                                required
                            />
                            <InputError message={errors.gsm_nummer || customErrors.gsm_nummer} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="password" value="Wachtwoord" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Bevestig wachtwoord"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="keuze_sms"
                                checked={data.keuze_sms}
                                onChange={(e) => setData('keuze_sms', e.target.checked)}
                                className="rounded border-gray-300 text-brown-600 shadow-sm focus:ring-brown-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Keuze voor SMS</span>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="keuze_email"
                                checked={data.keuze_email}
                                onChange={(e) => setData('keuze_email', e.target.checked)}
                                className="rounded border-gray-300 text-brown-600 shadow-sm focus:ring-brown-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Keuze voor Email</span>
                        </div>
                    </div>

                    {checkboxError && (
                        <div className="mt-4 text-sm text-red-600">{checkboxError}</div>
                    )}

                    <div className="mt-6 flex items-center justify-between">
                        <Link
                            href={route('login')}
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                        >
                            Heeft u al een account? Log in!
                        </Link>
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Maak account
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
        </>
    );
}
