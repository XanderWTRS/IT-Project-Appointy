import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Header from "/resources/js/Components/Header";
import Footer from "/resources/js/Components/Footer";
import SidebarUser from "/resources/js/Components/SidebarUser";

export default function NotificationsPage({ auth, notificationSettings }) {
    const [isSMSActive, setIsSMSActive] = useState(notificationSettings.smsActive);
    const [isEmailActive, setIsEmailActive] = useState(notificationSettings.emailActive);

    const toggleSMS = () => {
        if (isSMSActive && !isEmailActive) {
            alert("U moet minimaal één notificatiemethode aanhouden.");
            return;
        }

        setIsSMSActive((prev) => !prev);
    };

    const toggleEmail = () => {
        if (isEmailActive && !isSMSActive) {
            alert("U moet minimaal één notificatiemethode aanhouden.");
            return;
        }

        setIsEmailActive((prev) => !prev);
    };

    return (
        <>
            <Head title="Meldingen" />
            <style>
                {`
                    .toggle-container {
                        position: relative;
                        overflow: hidden;
                        border-radius: 0.5rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1rem;
                        cursor: pointer;
                        background-color: #f3f4f6;
                    }

                    .toggle-container::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 0;
                        background-color: #d1fae5; /* Groen bij activatie */
                        z-index: 0;
                        transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out;
                    }

                    .toggle-container.active::before {
                        width: 100%; /* Volledig groen bij activatie */
                        background-color: #d1fae5;
                    }

                    .toggle-container.inactive::before {
                        width: 0; /* Geen breedte bij deactivatie */
                        background-color: #f3f4f6;
                    }

                    .toggle-content {
                        position: relative;
                        z-index: 1;
                        display: flex;
                        align-items: center;
                    }

                    .toggle-content img {
                        margin-right: 1rem;
                    }

                    .toggle-status {
                        position: relative;
                        z-index: 1;
                        width: 2rem;
                        height: 2rem;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 1rem;
                        font-weight: bold;
                        background-color: #d1d5db; /* Standaard grijze cirkel */
                        transition: background-color 0.5s ease;
                    }

                    .toggle-status.bg-green-500 {
                        background-color: #34d399; /* Groen vinkje bij activatie */
                    }
                `}
            </style>

            <div className="header">
                <Header auth={auth} />
            </div>

            <div className="bg-white p-8 max-w-7xl mx-auto mt-8">
                <div className="flex gap-8">
                    <SidebarUser />

                    <div className="w-3/4 mb-8 shadow-md rounded-md p-8 bg-white -ml-4">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Meldingen</h2>
                        <p className="text-gray-600 mb-4">
                            Selecteer hoe u meldingen wilt ontvangen: via SMS, e-mail of beide.
                        </p>

                        <div className="space-y-4">
                            <div
                                className={`toggle-container ${
                                    isSMSActive ? "active" : "inactive"
                                }`}
                                onClick={toggleSMS}
                            >
                                <div className="toggle-content">
                                    <img
                                        src="/Assets/Icons/phone.svg"
                                        alt="phone icon"
                                        className="w-8 h-8"
                                    />
                                    <span className="font-bold text-gray-800">SMS</span>
                                    <span className="text-red-500 text-sm ml-2">(extra kosten mogelijk)</span>
                                </div>
                                <div
                                    className={`toggle-status ${
                                        isSMSActive ? "bg-green-500" : "bg-gray-300"
                                    }`}
                                >
                                    ✓
                                </div>
                            </div>

                            <div
                                className={`toggle-container ${
                                    isEmailActive ? "active" : "inactive"
                                }`}
                                onClick={toggleEmail}
                            >
                                <div className="toggle-content">
                                    <img
                                        src="/Assets/Icons/mail.svg"
                                        alt="email icon"
                                        className="w-8 h-8"
                                    />
                                    <span className="font-bold text-gray-800">Email</span>
                                </div>
                                <div
                                    className={`toggle-status ${
                                        isEmailActive ? "bg-green-500" : "bg-gray-300"
                                    }`}
                                >
                                    ✓
                                </div>
                            </div>

                            {isSMSActive && isEmailActive && (
                                <div className="p-4 bg-blue-100 text-blue-800 rounded shadow-sm">
                                    <p>U ontvangt meldingen via zowel SMS als e-mail.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
