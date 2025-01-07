import React, { useState } from 'react';
import AdminLayout from "../../Layouts/AdminLayout";
import { Head, useForm } from '@inertiajs/react';
import ConfirmationAnimation from "../../Components/ConfirmationAnimation";
import "/resources/css/bevstig.css";

const EditPersoneelPage = ({ personeel }) => {
  const { data, setData, patch, errors } = useForm({
    voornaam: personeel.voornaam,
    naam: personeel.naam,
    functie: personeel.functie,
    bio: personeel.bio,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Verzonden data:", data);


    setShowConfirmation(true);


    patch(`/admin/personeel/${personeel.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        console.log("PATCH succesvol, wijzigingen doorgevoerd.");

        setTimeout(() => {
          setShowConfirmation(false);
          window.location.href = "/admin/personeel";
        }, 1500);
      },
      onError: (errors) => {
        console.error("PATCH fouten:", errors);
        alert("Er is een fout opgetreden. Controleer uw invoer.");
        setShowConfirmation(false);
      },
    });
  };

  return (
    <AdminLayout>
      <Head title="Personeel Bewerken" />
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-8 -mt-2">
        Personeel bewerken
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span></h1>
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700">Voornaam:</label>
            <input
              type="text"
              value={data.voornaam}
              onChange={(e) => setData('voornaam', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errors.voornaam && <p className="text-red-500 text-sm">{errors.voornaam}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Naam:</label>
            <input
              type="text"
              value={data.naam}
              onChange={(e) => setData('naam', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errors.naam && <p className="text-red-500 text-sm">{errors.naam}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Functie:</label>
            <input
              type="text"
              value={data.functie}
              onChange={(e) => setData('functie', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errors.functie && <p className="text-red-500 text-sm">{errors.functie}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bio:</label>
            <textarea
              value={data.bio}
              onChange={(e) => setData('bio', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Foto:</label>
            <img
              src={`/Assets/Team-Liedent/${personeel.foto}`}
              alt={`${personeel.voornaam} ${personeel.naam}`}
              className="w-40 h-40 object-cover rounded"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
                Annuleren
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Bevestigen
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Animation */}
      <ConfirmationAnimation show={showConfirmation} />
    </AdminLayout>
  );
};

export default EditPersoneelPage;
