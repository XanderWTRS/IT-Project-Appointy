import React from "react";
import "/resources/css/bevestig.css";
 

const ConfirmationAnimation = ({ show }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="relative">
                <div className="w-32 h-32 border-4 border-gray-300 rounded-full animate-spin-to-green"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#32CD32"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2l4-4"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationAnimation;
