import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import SearchBar from "../../Components/SearchBar";
import { Inertia } from '@inertiajs/inertia';

const AfsprakenPage = ({ afspraken, filters }) => {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = () => {
        Inertia.get(route('admin.afspraken'), { search });
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-2">Afspraken Overzicht</h1>
            <hr className="border-blue-500 w-1/2 mb-6" />

            {/* SearchBar Component */}
            <div className="mb-6">
                <SearchBar
                    value={search}
                    onChange={(val) => setSearch(val)}
                    onReset={() => setSearch('')}
                    onSearch={handleSearch}
                />
            </div>

            {/* Container voor afsprakenoverzicht */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-4 py-3 text-left font-bold">User ID</th>
                                <th className="px-4 py-3 text-left font-bold">Datum</th>
                                <th className="px-4 py-3 text-left font-bold">Behandeling</th>
                            </tr>
                        </thead>
                        <tbody>
                            {afspraken && afspraken.length > 0 ? (
                                afspraken.map((afspraak, index) => (
                                    <tr
                                        key={afspraak.user_id}
                                        className={
                                            index % 2 === 0
                                                ? "bg-white hover:bg-gray-50"
                                                : "bg-gray-50 hover:bg-gray-100"
                                        }
                                    >
                                        <td className="px-4 py-2 text-gray-700">{afspraak.user_id}</td>
                                        <td className="px-4 py-2 text-gray-700">{afspraak.datum}</td>
                                        <td className="px-4 py-2 text-gray-700">{afspraak.behandeling}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="px-4 py-2 text-center text-gray-500"
                                        colSpan={3}
                                    >
                                        Geen afspraken gevonden.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AfsprakenPage;
