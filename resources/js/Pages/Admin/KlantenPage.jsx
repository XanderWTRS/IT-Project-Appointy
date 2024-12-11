import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import Excel from "/resources/js/Components/Excel";
import SearchBar from "/resources/js/Components/SearchBar";
import Edit from "../Components/Edit";

const KlantenPage = ({ klanten }) => {
  const [search, setSearch] = useState("");
  const [filteredKlanten, setFilteredKlanten] = useState(klanten);

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = klanten.filter(
      (klant) =>
        klant.voornaam.toLowerCase().includes(value.toLowerCase()) ||
        klant.naam.toLowerCase().includes(value.toLowerCase()) ||
        klant.rijksregister_nr.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredKlanten(filtered);
  };

  const handleReset = () => {
    setSearch("");
    setFilteredKlanten(klanten);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        {/* Title with Blue Line */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Klanten</h1>
          <div className="h-1 w-60 bg-blue-500 mt-1"></div>
        </div>
        {/* Excel Button on the Right */}
        <div>
          <Excel />
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <SearchBar value={search} onChange={handleSearch} onReset={handleReset} />
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-4 border-b text-left">Klant</th>
              <th className="p-4 border-b text-left">Rijksregisternummer</th>
              <th className="p-4 border-b text-center">Gegevens</th>
            </tr>
          </thead>
          <tbody>
            {filteredKlanten.length > 0 ? (
              filteredKlanten.map((klant) => (
                <tr
                  key={klant.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="p-4 border-b text-gray-800">
                    {klant.voornaam} {klant.naam}{" "}
                    <span className="text-blue-500">#{klant.id}</span>
                  </td>
                  <td className="p-4 border-b text-gray-800">
                    {klant.rijksregister_nr || "Onbekend"}
                  </td>
                   <td className="p-2 border border-gray-300 text-center" style={{ width: "180px" }}>
                    <div className="flex justify-center items-center">
                      <Edit userId={klant.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  Geen resultaten gevonden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default KlantenPage;
