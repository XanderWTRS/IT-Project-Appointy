import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import CancelModal from "/resources/js/Components/CancelModal";

export default function WachtlijstPage() {
    const { props } = usePage();
    const { inWachtlijst, wachtlijst, monthsLeft, daysLeft, addedAt, targetDate, flash, csrf_token } = props;

    const [isModalOpen, setModalOpen] = useState(false);
    const [visible, setVisible] = useState(true);

    // Check if target date has passed
    const targetDateHasPassed = new Date(targetDate) <= new Date();

    useEffect(() => {
        if (flash.success || flash.error) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleConfirmCancel = () => {
        document.getElementById("cancel-form").submit();
    };

    return (
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg relative">
            <h1 className="text-3xl font-bold mb-6">Afspraken</h1>

            {/* Flash Messages */}
            {flash.success && visible && (
                <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
                    {flash.success}
                </div>
            )}
            {flash.error && visible && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                    {flash.error}
                </div>
            )}

            {inWachtlijst ? (
                <>
                    {/* Conditional Text */}
                    <p className="text-lg mb-6">
                        {targetDateHasPassed ? (
                            <span>
                                U kan een afspraak maken door op de onderstaande knop te drukken.
                            </span>
                        ) : (
                            <span>
                                U moet nog{" "}
                                <strong className="text-blue-600">{monthsLeft}</strong> maand(en) en{" "}
                                <strong className="text-blue-600">{daysLeft}</strong> dag(en) wachten voordat u een afspraak kunt maken.
                            </span>
                        )}
                    </p>

                    <div className="bg-gray-100 p-6 rounded-lg mb-6">
                        <h2 className="text-2xl font-semibold mb-4">U staat in de wachtlijst</h2>
                        <p className="text-gray-800">
                            <strong>Behandeling:</strong> {wachtlijst?.behandeling || "Geen"}
                        </p>
                        <p className="text-gray-800">
                            <strong>Toegevoegd aan wachtlijst op:</strong> {addedAt}
                        </p>
                        <p className="text-gray-800">
                            <strong>Afspraak mogelijk vanaf:</strong> {targetDate}
                        </p>
                    </div>

                    <div className="flex space-x-4">
                        {/* "Maak afspraak" Button */}
                        <button
                            className={`px-6 py-3 font-semibold rounded-lg shadow transition ${
                                targetDateHasPassed
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-400 text-white cursor-not-allowed"
                            }`}
                            onClick={() => {
                                if (targetDateHasPassed) {
                                    window.location.href = "/afspraken/make";
                                }
                            }}
                            disabled={!targetDateHasPassed}
                        >
                            Maak afspraak
                        </button>

                        {/* "Afspraak annuleren" Button */}
                        <form id="cancel-form" action={route('afspraken.cancel')} method="post">
                            <input type="hidden" name="_token" value={csrf_token} />
                            <button
                                type="button"
                                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
                                onClick={() => setModalOpen(true)}
                            >
                                Afspraak annuleren
                            </button>
                        </form>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <p className="text-lg mb-6">
                        U bent nog niet in de wachtlijst. Klik op de onderstaande knop om een plaats in de wachtlijst te reserveren.
                    </p>
                    <button
                        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
                        onClick={() => {
                            window.location.href = "/payment";
                        }}
                    >
                        Voeg toe aan Wachtlijst
                    </button>
                </div>
            )}

            {/* Confirmation Modal */}
            <CancelModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmCancel}
            />
        </div>
    );
}
