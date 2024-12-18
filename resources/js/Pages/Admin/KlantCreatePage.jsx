import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import ConfirmationAnimation from "../../Components/ConfirmationAnimation";
import axios from "axios";
import "/resources/css/bevstig.css";

const KlantenCreatePage = () => {
    const [formData, setFormData] = useState({
        voornaam: "",
        naam: "",
        geboortedatum: "",
        mutualiteit: "",
        rijksregister_nr: "",
        tandarts: "",
        gsm_nummer: "",
        email: "",
    });
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/admin/klanten/store", formData);
            setShowConfirmation(true);
            setTimeout(() => (window.location.href = "/admin/klanten"), 1500);
        } catch (error) {
            console.error("Fout bij het aanmaken van klant:", error);
            alert("Er is iets misgegaan. Probeer het opnieuw.");
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">Klant Aanmaken</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700">
                            {key.replace("_", " ").toUpperCase()}
                        </label>
                        <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                ))}
                <div className="col-span-2 flex justify-end gap-4 mt-6">
                    <button type="submit" className="button bevestigen">
                        Bevestigen
                    </button>
                </div>
            </form>
            <ConfirmationAnimation show={showConfirmation} />
        </AdminLayout>
    );
};

export default KlantenCreatePage;
