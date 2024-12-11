import React, { useState } from "react";

const DeletePopUp = ({ onCancel, onConfirm }) => {
  const [isHoveringCancel, setIsHoveringCancel] = useState(false);
  const [isHoveringConfirm, setIsHoveringConfirm] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-[300px] flex flex-col p-4 bg-white border border-gray-300 shadow-lg rounded-lg">
        <div className="text-center p-3 flex-auto justify-center">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              fillRule="evenodd"
            />
          </svg>
          <h2 className="text-xl font-bold py-4 text-gray-700">Weet je het zeker?</h2>
          <p className="font-bold text-sm text-gray-600 px-2">
            Deze actie kan niet ongedaan worden gemaakt.
          </p>
        </div>
        <div className="p-2 mt-2 flex justify-center gap-3">
          {/* Annuleren-knop */}
          <button
            onMouseEnter={() => setIsHoveringCancel(true)}
            onMouseLeave={() => setIsHoveringCancel(false)}
            onClick={onCancel}
            style={{
              backgroundColor: isHoveringCancel ? "transparent" : "#E5E7EB",
              color: isHoveringCancel ? "#000" : "#374151",
              border: "1px solid #D1D5DB",
              padding: "10px 20px",
              fontSize: "0.875rem",
              fontWeight: "600",
              borderRadius: "6px",
              transition: "all 0.3s ease-in-out",
              boxShadow: isHoveringCancel ? "0 0 8px rgba(0,0,0,0.3)" : "none",
            }}
          >
            Annuleren
          </button>

          {/* Verwijderen-knop */}
          <button
            onMouseEnter={() => setIsHoveringConfirm(true)}
            onMouseLeave={() => setIsHoveringConfirm(false)}
            onClick={onConfirm}
            style={{
              backgroundColor: isHoveringConfirm ? "transparent" : "#EF4444",
              color: isHoveringConfirm ? "#000" : "#FFF",
              border: "1px solid #EF4444",
              padding: "10px 20px",
              fontSize: "0.875rem",
              fontWeight: "600",
              borderRadius: "6px",
              transition: "all 0.3s ease-in-out",
              boxShadow: isHoveringConfirm ? "0 0 8px rgba(239,68,68,0.3)" : "none",
            }}
          >
            Verwijderen
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
