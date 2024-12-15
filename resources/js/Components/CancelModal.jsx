import React from "react";

export default function CancelModal({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    {title || "Bent u zeker dat u wilt annuleren?"}
                </h2>
                <p className="text-gray-600 mb-6">
                    {message ||
                        "Als u annuleert, zult u niet meer op de wachtlijst staan of uw afspraak verliezen. Wilt u doorgaan?"}
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                        Neen, annuleer
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Ja, verwijderen
                    </button>
                </div>
            </div>
        </div>
    );
}


