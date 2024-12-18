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
                    <div className="w-1/4 bg-white p-4 rounded-md shadow-md h-full">
                        <ul className="space-y-4">
                            <li>
                                <a href="/profile/edit" className="relative px-4 py-2 text-gray-700 font-semibold rounded flex items-center">
                                    <img src="/Assets/Icons/Profile.svg" alt="icon of the profile" className="w-8 h-8 rounded-full inline-block mr-4"/>
                                    <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                        Profiel
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="/afspraken" className="relative px-4 py-2 text-gray-700 font-semibold rounded flex items-center">
                                    <img src="/Assets/Icons/Calendar.svg" alt="icon of the profile" className="w-8 h-8 inline-block mr-4"/>
                                    <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                        Afspraken
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="relative px-4 py-2 text-gray-700 font-semibold rounded flex items-center group">
                                    <img src="/Assets/Icons/Bell.svg" alt="icon of the bell" className="w-8 h-8 rounded-full inline-block mr-4 transition-transform duration-500 group-hover:animate-swing"/>
                                    <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:origin-center group-hover:after:left-0 group-hover:after:w-full">
                                        Meldingen
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Main Content */}
                    <div className="w-3/4 mb-8 shadow-md rounded-md p-8 bg-white -ml-4">
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 -mt-4">
                            Profiel Aanpassen
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                        </h1>

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
