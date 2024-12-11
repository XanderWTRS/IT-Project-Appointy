import React from "react";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
    return (
        <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                {/* Toggle Button */}
                {!isSidebarOpen && ( // Only show button when sidebar is closed
                    <button
                        onClick={toggleSidebar}
                        className="p-2 bg-blue-500 text-white rounded-md focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                )}

                {/* Logo */}
                <div className="text-2xl font-bold flex items-center">
                    <span className="text-blue-500">Liedent</span>
                </div>

                {/* User Icon */}
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5.121 17.804A7.5 7.5 0 0112 15a7.5 7.5 0 016.879 2.804M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
