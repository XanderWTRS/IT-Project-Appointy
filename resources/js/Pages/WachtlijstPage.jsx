import React, { useState, useEffect } from "react";
import { usePage, Head } from "@inertiajs/react";

import CancelModal from "/resources/js/Components/CancelModal";
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';

export default function WachtlijstPage() {
    const { props } = usePage();
    const {
        inWachtlijst,
        wachtlijst,
        monthsLeft,
        daysLeft,
        addedAt,
        targetDate,
        appointment,
        flash,
        csrf_token
    } = props;

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // Tracks which modal is open: "waitlist" or "appointment"
    const [visible, setVisible] = useState(true);

    // Determine if the target date has passed
    const targetDateHasPassed = targetDate
        ? new Date(targetDate) <= new Date()
        : false;

    useEffect(() => {
        if (flash.success || flash.error) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleOpenModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const handleConfirmCancel = () => {
        if (modalType === "waitlist") {
            document.getElementById("cancel-waitlist-form").submit();
        } else if (modalType === "appointment") {
            document.getElementById("cancel-appointment-form").submit();
        }
    };

    return (
        <div className="bg-white text-gray-900">
            <Head title="lijst"/>
            <Header />
            <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg relative mb-8">
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

                {appointment ? (
                    // Display Appointment Details
                    <div className="bg-gray-100 p-6 rounded-lg mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Uw Afspraak</h2>
                        <p className="text-gray-800">
                            <strong>Datum:</strong> {appointment.datum}
                        </p>
                        <p className="text-gray-800">
                            <strong>Tijd:</strong> {appointment.tijd}
                        </p>
                        <p className="text-gray-800">
                            <strong>Behandeling:</strong> {appointment.behandeling}
                        </p>
                        <div className="mt-6 flex space-x-4">
                            {/* Cancel Appointment Button */}
                            <form
                                id="cancel-appointment-form"
                                action={route("afspraken.cancelAfspraak")}
                                method="post"
                            >
                                <input type="hidden" name="_token" value={csrf_token} />
                                <button
                                    type="button"
                                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
                                    onClick={() => handleOpenModal("appointment")}
                                >
                                    Afspraak annuleren
                                </button>
                            </form>
                        </div>
                    </div>
                ) : inWachtlijst ? (
                    // Display Waitlist Information
                    <>
                        <p className="text-lg mb-6">
                            {targetDateHasPassed ? (
                                <span>
                                    U kan een afspraak maken door op de onderstaande knop te
                                    drukken.
                                </span>
                            ) : (
                                <span>
                                    U moet nog{" "}
                                    <strong className="text-blue-600">{monthsLeft}</strong>{" "}
                                    maand(en) en{" "}
                                    <strong className="text-blue-600">{daysLeft}</strong>{" "}
                                    dag(en) wachten voordat u een afspraak kunt maken.
                                </span>
                            )}
                        </p>

                        <div className="bg-gray-100 p-6 rounded-lg mb-6">
                            <h2 className="text-2xl font-semibold mb-4">
                                U staat in de wachtlijst
                            </h2>
                            <p className="text-gray-800">
                                <strong>Behandeling:</strong>{" "}
                                {wachtlijst?.behandeling || "Geen"}
                            </p>
                            <p className="text-gray-800">
                                <strong>Toegevoegd aan wachtlijst op:</strong> {addedAt}
                            </p>
                            <p className="text-gray-800">
                                <strong>Afspraak mogelijk vanaf:</strong> {targetDate}
                            </p>
                        </div>

                        <div className="flex space-x-4">
                            {/* Maak Afspraak Button */}
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

                            {/* Cancel Waitlist Button */}
                            <form
                                id="cancel-waitlist-form"
                                action={route("afspraken.cancelWachtlijst")}
                                method="post"
                            >
                                <input type="hidden" name="_token" value={csrf_token} />
                                <button
                                    type="button"
                                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
                                    onClick={() => handleOpenModal("waitlist")}
                                >
                                    Wachtlijst annuleren
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    // Display Not in Waitlist Message
                    <div className="text-center">
                        <p className="text-lg mb-6">
                            U bent nog niet in de wachtlijst. Klik op de onderstaande knop om
                            een plaats in de wachtlijst te reserveren.
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
                    title={
                        modalType === "waitlist"
                            ? "Bent u zeker dat u uit de wachtlijst wilt?"
                            : "Bent u zeker dat u uw afspraak wilt annuleren?"
                    }
                    message={
                        modalType === "waitlist"
                            ? "Als u annuleert, zult u niet meer in de wachtlijst staan en moet u opnieuw toegevoegd worden aan de wachtlijst om in de toekomst een afspraak te kunnen maken. U zult uw voorstorting terugkrijgen. Deze zal binnen 5 werkdagen op uw rekening staan."
                            : "Als u annuleert, zal uw afspraak worden geannuleerd. U kunt een nieuwe afspraak maken via de planner."
                    }
                />

            </div>
            <Footer />
        </div>
    );
}
