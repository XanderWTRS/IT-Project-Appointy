import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Header from "/resources/js/Components/Header";
import Footer from "/resources/js/Components/Footer";
import SidebarUser from "/resources/js/Components/SidebarUser";
import "/resources/css/SidebarUser.css";
import "/resources/css/button.css";

export default function NotificationsPage({ auth }) {
    const [isSMSActive, setIsSMSActive] = useState(true); // SMS toggle
    const [isMailActive, setIsMailActive] = useState(false); // Mail toggle
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <Head title="Meldingen" />
            <div className="header">
                <Header auth={auth} />
            </div>
            <div className="flex">
                {isSidebarOpen && (
                    <div className="sidebar">
                        <SidebarUser />
                    </div>
                )}

                <div className={`flex-1 ${isSidebarOpen ? "" : "w-full"}`}>
                    {/* Sidebar Toggle Button */}
                    {!isSidebarOpen && (
                        <button
                            onClick={toggleSidebar}
                            className="p-3 fixed left-4 z-50 bg-blue-500 text-white rounded-full hover:scale-110 transform transition-transform"
                            style={{ top: "4.5rem", left: "1rem" }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    )}

                    {/* Page Content */}
                    <div className="bg-white p-8 shadow sm:rounded-lg max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Meldingen</h2>
                        <p className="text-gray-600 mb-4">
                            U krijgt meldingen van toekomstige afspraken, gemiste afspraken en wanneer u een
                            nieuwe afspraak kan maken.
                        </p>

                        <div className="space-y-4">
                            {/* SMS Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-100 rounded shadow-sm">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 mr-2 text-gray-800"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 7-9 11-9 11s-9-4-9-11a9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="font-bold text-gray-800">SMS</span>
                                    <span className="text-red-500 text-sm ml-2">(extra kosten mogelijk)</span>
                                </div>
                                <button
                                    onClick={() => setIsSMSActive(!isSMSActive)}
                                    className={`w-8 h-8 rounded-full ${
                                        isSMSActive ? "bg-green-500" : "bg-gray-300"
                                    }`}
                                >
                                    {isSMSActive ? "✓" : "✕"}
                                </button>
                            </div>

                            {/* Mail Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-100 rounded shadow-sm">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 mr-2 text-gray-800"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l9 6 9-6M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9 6-9-6"
                                        />
                                    </svg>
                                    <span className="font-bold text-gray-800">Mail</span>
                                </div>
                                <button
                                    onClick={() => setIsMailActive(!isMailActive)}
                                    className={`w-8 h-8 rounded-full ${
                                        isMailActive ? "bg-green-500" : "bg-red-500"
                                    }`}
                                >
                                    {isMailActive ? "✓" : "✕"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
