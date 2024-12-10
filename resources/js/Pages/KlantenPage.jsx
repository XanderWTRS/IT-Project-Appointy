import React from "react";
import Navbar from "../Components/Navbar";

const KlantenPage = () => {
    return (
        <div>
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="text-2xl font-bold flex items-center">
                        <span className="text-blue-500">Liedent</span>
                    </div>
                </div>
            </header>
            <main className="p-6">
                <h1 className="text-2xl font-bold">Klanten</h1>
                <p>Hier komt het overzicht van klanten.</p>
            </main>
        </div>
    );
};

export default KlantenPage;
