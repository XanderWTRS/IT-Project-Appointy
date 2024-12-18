import React, { useState } from "react";
import { Head, useForm } from '@inertiajs/react';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';
import ConfirmationAnimation from '/resources/js/Components/ConfirmationAnimation';
import DeletePopUp from '/resources/js/Components/DeletePopUp';
import SidebarUser from '/resources/js/Components/SidebarUser';

import "/resources/css/SidebarUser.css";
import "/resources/css/bevstig.css";
import "/resources/css/button.css";

export default function Edit({ user }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        email: user.email || '',
        voornaam: user.voornaam || '',
        naam: user.naam || '',
        gsm_nummer: user.gsm_nummer || '',
        adres: user.adres || '',
        current_password: '',
        new_password: '',
        confirm_password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('profile.update'));
    };

    const handleDeleteAccount = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route('delete-account', { id: user.id });

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = '_token';
        input.value = csrfToken;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <>
            <Head title="Profiel" />

            {/* Header */}
            <div className="header">
                <Header auth={user} />
            </div>

            <div className="bg-white p-8 max-w-7xl mx-auto mt-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <div className="w-1/4 bg-gray-100 p-4 rounded-md shadow-md h-full">
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="block px-4 py-2 text-gray-700 font-semibold hover:bg-blue-500 hover:text-white rounded">
                                    Profiel
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-gray-700 font-semibold hover:bg-blue-500 hover:text-white rounded">
                                    Afspraken
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-gray-700 font-semibold hover:bg-blue-500 hover:text-white rounded">
                                    Meldingen
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Main Content */}
                    <div className="w-3/4">
                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profiel Aanpassen</h2>

                        {/* Form */}
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Voornaam */}
                            <div>
                                <label htmlFor="voornaam" className="block text-sm font-medium text-gray-700">
                                    Voornaam
                                </label>
                                <input
                                    id="voornaam"
                                    type="text"
                                    value={data.voornaam}
                                    onChange={(e) => setData('voornaam', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.voornaam && <p className="text-red-500 text-sm">{errors.voornaam}</p>}
                            </div>

                            {/* Achternaam */}
                            <div>
                                <label htmlFor="naam" className="block text-sm font-medium text-gray-700">
                                    Achternaam
                                </label>
                                <input
                                    id="naam"
                                    type="text"
                                    value={data.naam}
                                    onChange={(e) => setData('naam', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.naam && <p className="text-red-500 text-sm">{errors.naam}</p>}
                            </div>

                            {/* E-mail */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    E-mail
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            {/* GSM-nummer */}
                            <div>
                                <label htmlFor="gsm_nummer" className="block text-sm font-medium text-gray-700">
                                    GSM-nummer
                                </label>
                                <input
                                    id="gsm_nummer"
                                    type="text"
                                    value={data.gsm_nummer}
                                    onChange={(e) => setData('gsm_nummer', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.gsm_nummer && <p className="text-red-500 text-sm">{errors.gsm_nummer}</p>}
                            </div>

                            {/* Adres */}
                            <div className="md:col-span-2">
                                <label htmlFor="adres" className="block text-sm font-medium text-gray-700">
                                    Adres
                                </label>
                                <input
                                    id="adres"
                                    type="text"
                                    value={data.adres}
                                    onChange={(e) => setData('adres', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.adres && <p className="text-red-500 text-sm">{errors.adres}</p>}
                            </div>

                            {/* Password Update */}
                            <div className="md:col-span-2">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4">Wachtwoord Aanpassen</h3>
                            </div>

                            <div>
                                <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                                    Huidig Wachtwoord
                                </label>
                                <input
                                    id="current_password"
                                    type="password"
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                                    Nieuw Wachtwoord
                                </label>
                                <input
                                    id="new_password"
                                    type="password"
                                    value={data.new_password}
                                    onChange={(e) => setData('new_password', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                                    Bevestig Nieuw Wachtwoord
                                </label>
                                <input
                                    id="confirm_password"
                                    type="password"
                                    value={data.confirm_password}
                                    onChange={(e) => setData('confirm_password', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="md:col-span-2 flex justify-between mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Opslaan
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => setShowDeletePopUp(true)}
                                >
                                    Account Verwijderen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ConfirmationAnimation show={showConfirmation} />
            {showDeletePopUp && (
                <DeletePopUp
                    onCancel={() => setShowDeletePopUp(false)}
                    onConfirm={() => {
                        setShowDeletePopUp(false);
                        handleDeleteAccount();
                    }}
                />
            )}

            <Footer />
        </>
    );
}
