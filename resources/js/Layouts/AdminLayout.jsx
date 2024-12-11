import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar";


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
                        style={{ top: "4.2rem" , left: "1rem" }}  
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

                        {/* Profile Icon */}
                        <div className="flex items-center">
                        <img
                            src="/Assets/Icons/Profile.svg" 
                            alt="Profile Icon"
                            className="h-6 w-6" 
                        />
                        </div>
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
