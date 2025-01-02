import React, { useEffect, useState } from "react";
import "/resources/css/FlipCard.css";
import axios from "axios";
import DeletePopUp from "./DeletePopUp";

const FlipCardAdmin = ({ id }) => {
  const [personeelData, setPersoneelData] = useState(null);

  useEffect(() => {
    fetch(`/personeel/data/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Data niet gevonden");
        return response.json();
      })
      .then((data) => setPersoneelData(data))
      .catch((error) => console.error("Fout bij ophalen gegevens:", error));
  }, [id]);

  if (!personeelData) {
    return <div></div>;
  }

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Voorzijde */}
        <div className="flip-card-front">
        <img
            src={`/Assets/Team-Liedent/${personeelData.foto}`}
            alt={`${personeelData.voornaam} ${personeelData.naam}`}
            className="w-full h-4/5 object-cover rounded-t-lg"
            loading="lazy"
        />
          <div className="p-4 text-center">
            <h2 className="text-lg font-bold">
              {personeelData.voornaam} {personeelData.naam}
            </h2>
            <p className="text-sm text-gray-500">{personeelData.functie}</p>
          </div>
        </div>

        {/* Achterzijde */}
        <div className="flip-card-back">
          <div className="flex items-center justify-center h-full text-center px-4">
            <p className="text-gray-800">{personeelData.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCardAdmin;
