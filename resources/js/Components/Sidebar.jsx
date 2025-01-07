import React from "react";
import { usePage } from "@inertiajs/react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { url } = usePage(); // Verkrijg de huidige URL van Inertia

    const isActive = (path) => url.startsWith(path);

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

            <nav>
                <a
                    href="/admin/dashboard"
                    className={`block py-2.5 px-4 rounded transition duration-200 ${
                        isActive("/admin/dashboard") ? "bg-blue-700" : "hover:bg-blue-600"
                    }`}
                >
                    Dashboard
                </a>
                <a
                    href="/admin/klanten"
                    className={`block py-2.5 px-4 rounded transition duration-200 ${
                        isActive("/admin/klanten") ? "bg-blue-700" : "hover:bg-blue-600"
                    }`}
                >
                    Klanten
                </a>
                <a
                    href="/admin/afspraken"
                    className={`block py-2.5 px-4 rounded transition duration-200 ${
                        isActive("/admin/afspraken") ? "bg-blue-700" : "hover:bg-blue-600"
                    }`}
                >
                    Afspraken
                </a>
                <a
                    href="/admin/personeel"
                    className={`block py-2.5 px-4 rounded transition duration-200 ${
                        isActive("/admin/personeel") ? "bg-blue-700" : "hover:bg-blue-600"
                    }`}
                >
                    Personeel
                </a>

            </nav>
        </div>
    );
};

export default Sidebar;
