import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import DeletePopUp from "../../Components/DeletePopUp";
import ConfirmationAnimation from "../../Components/ConfirmationAnimation"; // Importeer hier
import axios from "axios";
import "/resources/css/bevstig.css";


const UserDetailsPage = ({ user }) => {
    const [formData, setFormData] = useState(user);
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(`/admin/users/${user.id}`, formData);
            setShowConfirmation(true);
            setTimeout(() => {
                setShowConfirmation(false);
                window.location.href = "/admin/klanten"; 
            }, 1100);
        } catch (error) {
            console.error("Error bij het bijwerken van de gebruiker:", error);
            alert("Er is iets misgegaan. Probeer het opnieuw.");
        }
    };
    
    const handleDeleteClick = () => {
        setShowDeletePopUp(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`/admin/users/${user.id}`);
    
            // Controleer of er een redirect-URL in de response zit
            if (response.data.redirect) {
                window.location.href = response.data.redirect;
            } else {
                alert("Gebruiker succesvol verwijderd.");
            }
        } catch (error) {
            console.error("Error bij het verwijderen van de gebruiker:", error);
    
            if (error.response?.status === 404) {
                alert("Gebruiker niet gevonden. Het verwijderen is mislukt.");
            } else {
                alert("Kan gebruiker niet verwijderen. Probeer het opnieuw.");
            }
        }
    };
    
    

    const handleCancelDelete = () => {
        setShowDeletePopUp(false);
    };

    const handleBoete = async () => {
        try {
            const response = await axios.patch(`/admin/users/${user.id}/toggle-boete`);
            if (response.data) {
                setFormData({ ...formData, boete: response.data.boete });
                
                setShowConfirmation(true);
                setTimeout(() => setShowConfirmation(false), 1100);
            }
        } catch (error) {
            console.error("Error bij het bijwerken van de boete status:", error);
            alert("Er is iets misgegaan. Probeer het opnieuw.");
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">Gebruiker details</h1>
            <form className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Voornaam</label>
                    <input
                        type="text"
                        name="voornaam"
                        value={formData.voornaam || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Achternaam</label>
                    <input
                        type="text"
                        name="naam"
                        value={formData.naam || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Telefoon</label>
                    <input
                        type="text"
                        name="gsm_nummer"
                        value={formData.gsm_nummer || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rijksregisternummer</label>
                    <input
                        type="text"
                        name="rijksregister_nr"
                        value={formData.rijksregister_nr || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mutualiteit</label>
                    <input
                        type="text"
                        name="mutualiteit"
                        value={formData.mutualiteit || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="button-wrapper col-span-2 flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={handleUpdate}
                        className="button bevestigen"
                    >
                        Bevestigen
                    </button>
                    <button
                        type="button"
                        onClick={handleBoete}
                        className="button boete"
                    >
                        Boete
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteClick}
                        className="button verwijderen"
                    >
                        Verwijderen
                    </button>
                </div>
            </form>
            

            <ConfirmationAnimation show={showConfirmation} />

            {showDeletePopUp && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <DeletePopUp
                        onCancel={handleCancelDelete}
                        onConfirm={handleConfirmDelete}
                    />
                </div>
            )}
        </AdminLayout>
    );
};
export default UserDetailsPage;