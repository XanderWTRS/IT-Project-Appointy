// src/components/ConfirmationModal.jsx

import React from "react";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, appointment }) {
    if (!isOpen) return null;

    const { date, time, treatment } = appointment;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Bevestig uw afspraak
                </h2>
                <p className="text-gray-600 mb-2">
                    <strong>Datum:</strong> {date}
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>Tijd:</strong> {time}
                </p>
                <p className="text-gray-600 mb-6">
                    <strong>Behandeling:</strong> {treatment}
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                        Nee, annuleer
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Ja, bevestigen
                    </button>
                </div>
            </div>
        </div>
    );
}
