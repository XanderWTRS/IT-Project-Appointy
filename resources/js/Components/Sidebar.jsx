import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div
            className={`sidebar bg-blue-500 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-200 ease-in-out`}
        >
            <div className="flex items-center justify-between px-4">
                <h1 className="text-2xl font-bold">Menu</h1>
                <button
                    onClick={toggleSidebar}
                    className="text-white focus:outline-none"
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
            </div>

            {/* Navigatielinks */}
            <nav>
                <a
                    href="/dashboard"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600"
                >
                    Dashboard
                </a>
                <a
                    href="/klanten"
                    className="block py-2.5 px-4 rounded bg-blue-600"
                >
                    Klanten
                </a>
                <a
                    href="/klant-toevoegen"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600"
                >
                    Klant toevoegen
                </a>
                <a
                    href="/personeel"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600"
                >
                    Personeel
                </a>
                <a
                    href="/agenda"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600"
                >
                    Agenda
                </a>
            </nav>
        </div>
    );
};

export default Sidebar;
