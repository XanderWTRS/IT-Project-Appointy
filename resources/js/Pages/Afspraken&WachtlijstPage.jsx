import React, { useState, useEffect } from "react";
import { usePage, Head } from "@inertiajs/react";

import CancelModal from "/resources/js/Components/CancelModal";
import Header from "/resources/js/Components/Header";
import Footer from "/resources/js/Components/Footer";
import SidebarUser from "/resources/js/Components/SidebarUser";

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
        csrf_token,
        hasBoete,
        canMakeAppointment,
    } = props;

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [visible, setVisible] = useState(true);

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

    const canShowWaitlistInfo = monthsLeft > 0 || daysLeft > 0;

    return (
        <div className="bg-white text-gray-900">
            <Head title="Afspraken" />
            <Header />

            <div className="bg-white p-8 max-w-7xl mx-auto mt-8">
                <div className="flex gap-8">
                    <SidebarUser />
                    <div className="w-3/4 mb-8 shadow-md rounded-md p-8 bg-white -ml-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 -mt-4">
                            Afspraken
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                        </h1>

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
                            <>
                                <p className="text-lg mb-6">
                                    {wachtlijst?.allowed_to_book ? (
                                        <span className="text-green-600">
                                            Een afspraak maken is nu mogelijk.
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

                                {canShowWaitlistInfo && (
                                    <div className="bg-gray-100 p-6 rounded-lg mb-6">
                                        <h2 className="text-2xl font-semibold mb-4">
                                            U staat in de wachtlijst
                                        </h2>
                                        <p className="text-gray-800">
                                            <strong>Behandeling:</strong>{" "}
                                            {wachtlijst?.behandeling || "Geen"}
                                        </p>
                                        <p className="text-gray-800">
                                            <strong>Toegevoegd aan wachtlijst op:</strong>{" "}
                                            {addedAt || "Onbekend"}
                                        </p>
                                        <p className="text-gray-800">
                                            <strong>Afspraak mogelijk vanaf:</strong>{" "}
                                            {targetDate || "Onbekend"}
                                        </p>
                                    </div>
                                )}

                                <div className="flex space-x-4">
                                    <button
                                        className={`px-6 py-3 font-semibold rounded-lg shadow transition ${
                                            wachtlijst?.allowed_to_book || !canShowWaitlistInfo
                                                ? "bg-green-500 text-white hover:bg-green-600"
                                                : "bg-gray-400 text-white cursor-not-allowed"
                                        }`}
                                        onClick={() => {
                                            if (
                                                wachtlijst?.allowed_to_book ||
                                                !canShowWaitlistInfo
                                            ) {
                                                window.location.href = "/afspraken/make";
                                            }
                                        }}
                                        disabled={
                                            !(wachtlijst?.allowed_to_book || !canShowWaitlistInfo)
                                        }
                                    >
                                        Maak afspraak
                                    </button>
                                    <button
                                        className="px-6 py-3 font-semibold rounded-lg shadow bg-blue-500 text-white hover:bg-blue-600"
                                        onClick={() => {
                                            window.location.href = "/afspraken/make";
                                        }}
                                    >
                                        Testafspraak maken
                                    </button>
                                    <form
                                        id="cancel-waitlist-form"
                                        action={route("afspraken.cancelWachtlijst")}
                                        method="post"
                                    >
                                        <input
                                            type="hidden"
                                            name="_token"
                                            value={csrf_token}
                                        />
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
                            <div className="text-center">
                                <p className="text-lg mb-6">
                                    U bent nog niet in de wachtlijst. Klik op de onderstaande
                                    knop om een plaats in de wachtlijst te reserveren.
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
                                    ? "Als u annuleert, zult u niet meer in de wachtlijst staan en moet u opnieuw toegevoegd worden aan de wachtlijst om in de toekomst een afspraak te kunnen maken."
                                    : "Als u annuleert, zal uw afspraak worden geannuleerd."
                            }
                        />

                        <div className="mb-8 mt-20">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 -mt-4">
                                Boetes
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                            </h1>

                            {hasBoete ? (
                                <div className="p-6 bg-red-100 border border-red-300 rounded-lg text-red-800">
                                    <p className="text-lg mb-4">U heeft een openstaande boete.</p>
                                    <a
                                        href={route("payment.payFine")}
                                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600"
                                    >
                                        Betaal Boete
                                    </a>
                                </div>
                            ) : (
                                <div className="p-6 bg-green-100 border border-green-300 rounded-lg text-green-800">
                                    <p className="text-lg">U heeft geen openstaande boetes.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
