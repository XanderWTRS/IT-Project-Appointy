import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function AfspraakPage() {
    const { props } = usePage();
    const { wachtlijst, monthsPassed, daysPassed, flash } = props;

    const canMakeAppointment = monthsPassed >= 3;

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (flash.success || flash.error) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Afspraken</h1>

            {/* Flash Message */}
            {visible && flash.success && (
                <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
                    {flash.success}
                </div>
            )}
            {visible && flash.error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                    {flash.error}
                </div>
            )}

            {/* Conditional Sentence Rendering */}
            <p className="text-lg mb-6">
                {canMakeAppointment ? (
                    <span>
                        U kan een afspraak maken door op de onderste knop te drukken.
                    </span>
                ) : (
                    <span>
                        U staat nog{" "}
                        <strong className="text-blue-600">
                            {3 - monthsPassed > 0 ? 3 - monthsPassed : 0} maand(en) en{" "}
                            {30 - daysPassed > 0 ? 30 - daysPassed : 0} dag(en)
                        </strong>{" "}
                        in de wachtlijst.
                    </span>
                )}
            </p>


            <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4">Tijd tot afspraak</h2>
                <p className="text-gray-800">
                    <strong>Behandeling:</strong> {wachtlijst.behandeling}
                </p>
                <p className="text-gray-800">
                    <strong>Toegevoegd op:</strong>{" "}
                    {new Date(wachtlijst.added_at).toLocaleDateString("nl-BE")}
                </p>
            </div>

            <div className="flex space-x-4">
                {canMakeAppointment ? (
                    <button
                        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
                        onClick={() => {
                            // Logic for creating an appointment
                        }}
                    >
                        Maak afspraak
                    </button>
                ) : (
                    <button
                        className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow cursor-not-allowed"
                        disabled
                    >
                        Maak afspraak
                    </button>
                )}
                <button
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
                    onClick={() => {
                        // Logic for canceling an appointment
                    }}
                >
                    Afspraak annuleren
                </button>
            </div>
            <p className="text-sm text-red-500 mt-6">
                * Afspraken kunnen tot 24u voor de consultatie worden afgezegd!<br />
                * Bij het annuleren van een afspraak krijgt u uw €25 terug!
            </p>
        </div>
    );
}
