import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

const KlantenPage = ({ klanten }) => {
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Klanten</h1>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Import Excel
                </button>
            </div>
            <div className="bg-white shadow rounded-md p-4">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Zoek een klant..."
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border border-gray-300">Klant</th>
                            <th className="p-2 border border-gray-300">Rijksregisternummer</th>
                            <th className="p-2 border border-gray-300">Gegevens</th>
                        </tr>
                    </thead>
                    <tbody>
                        {klanten.map((klant) => (
                            <tr key={klant.id} className="hover:bg-gray-50">
                                <td className="p-2 border border-gray-300">
                                    {klant.voornaam} {klant.naam}{" "}
                                    <span className="text-blue-500">
                                        #{klant.id}
                                    </span>
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {klant.rijksregister_nr || "Onbekend"}
                                </td>
                                <td className="p-2 border border-gray-300 text-center">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        Info
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default KlantenPage;
