import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import "../../css/button.css";
import "/resources/css/logout.css"; // Zorg dat je CSS voor de nieuwe Logout-knop hier wordt geïmporteerd

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        window.location.href = "/logout"; // Voeg hier je logout-logica 
    };

    return (
        <div className="flex h-screen bg-blue-50 relative">
            {/* Sidebar */}
            <div ref={sidebarRef}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col transition-all duration-200 ${
                    isSidebarOpen ? "ml-64" : "ml-0"
                }`}
            >
                {/* Sidebar Toggle Button */}
                {!isSidebarOpen && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSidebar();
                        }}
                        className="p-3 fixed left-4 z-50 bg-blue-500 text-white shadow-lg rounded-full focus:outline-none hover:scale-110 transform transition-transform"
                        style={{ top: "4.5rem", left: "1rem" }}
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

                {/* Header */}
                <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-40">
                    <div className="flex justify-between items-center px-6 py-4">
                        {/* Title */}
                        <h1 className="text-lg font-bold text-gray-700">
                            Liedent Dashboard
                        </h1>

                        {/* Logout Button */}
                        <button className="Btn" onClick={handleLogout}>
                            <div className="sign">
                                <svg viewBox="0 0 512 512">
                                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                </svg>
                            </div>
                            <div className="text">Uitloggen</div>
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-12 mt-20">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
