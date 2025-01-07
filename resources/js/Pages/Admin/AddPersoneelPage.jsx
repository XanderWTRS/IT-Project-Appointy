import React, { useState } from 'react';
import AdminLayout from "../../Layouts/AdminLayout";
import { Head} from '@inertiajs/react';
import axios from 'axios';

const AddPersoneelPage = () => {
  const [formData, setFormData] = useState({
    voornaam: '',
    naam: '',
    functie: '',
    bio: '',
    foto: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('/admin/add-personeel', data);

      if (response.status === 201) {
        alert('Personeelslid succesvol toegevoegd!');
        window.location = '/admin/personeel';
      }
    } catch (error) {
      console.error('Fout bij het toevoegen van personeel:', error);
      alert(
        `Er is een fout opgetreden: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <AdminLayout>
        <Head title="Personeel" />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 mt-4">
        Team lid toevoegen
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
      </h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Voornaam</label>
          <input
            type="text"
            name="voornaam"
            className="w-full border rounded px-3 py-2"
            value={formData.voornaam}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Achternaam</label>
          <input
            type="text"
            name="naam"
            className="w-full border rounded px-3 py-2"
            value={formData.naam}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Functie</label>
          <input
            type="text"
            name="functie"
            className="w-full border rounded px-3 py-2"
            value={formData.functie}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            className="w-full border rounded px-3 py-2"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Foto</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Bevestigen
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuleren
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddPersoneelPage;
