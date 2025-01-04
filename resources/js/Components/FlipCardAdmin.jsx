import React, { useEffect, useState, memo } from "react";
import "/resources/css/FlipCard.css";
import axios from "axios";
import DeletePopUp from "./DeletePopUp";

const FlipCardAdmin = ({ id }) => {
  const [personeelData, setPersoneelData] = useState(null);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  useEffect(() => {
    fetch(`/personeel/data/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Data niet gevonden");
        return response.json();
      })
      .then((data) => setPersoneelData(data))
      .catch((error) => console.error("Fout bij ophalen gegevens:", error));
  }, []);

  if (!personeelData) {
    return <div></div>;
  }

  const handleEdit = () => {
    console.log(`/admin/edit-personeel/${id}`); // Log de URL
    window.location.href = `/admin/edit-personeel/${id}`;
};


  const handleDelete = () => {
    setShowDeletePopUp(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/admin/personeel/${id}`);
      setShowDeletePopUp(false);
      window.location.reload();
    } catch (error) {
      console.error("Fout bij verwijderen personeel:", error);
      alert("Er is een fout opgetreden bij het verwijderen.");
    }
  };

  return (
    <>
      <div className="flip-card">
        <div className="flip-card-inner">
          {/* Voorzijde */}
          <div className="flip-card-front">
            <img
              src={`/Assets/Team-Liedent/${personeelData.foto}`}
              alt={`${personeelData.voornaam} ${personeelData.naam}`}
              className="w-full h-4/5 object-cover rounded-t-lg"
              loading="lazy"
              decoding="asynchronous"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-bold">
                {personeelData.voornaam} {personeelData.naam}
              </h2>
              <p className="text-sm text-gray-500">{personeelData.functie}</p>
            </div>
          </div>

          {/* Achterzijde */}
          <div className="flip-card-back flex flex-col items-center justify-center">
            <div className="px-4">
              <p className="text-gray-800 mb-4">{personeelData.bio}</p>
            </div>
            <div className="flex space-x-4 mt-4">
              {/* Bewerken-knop */}
              <button
                onClick={handleEdit}
                className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600 transition"
                title="Bewerk Personeel"
              >
                ✏️
              </button>
              {/* Verwijderen-knop */}
              <button
                onClick={handleDelete}
                className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                title="Verwijder Personeel"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DeletePopUp Modal */}
      {showDeletePopUp && (
        <DeletePopUp
          onCancel={() => setShowDeletePopUp(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default FlipCardAdmin;
