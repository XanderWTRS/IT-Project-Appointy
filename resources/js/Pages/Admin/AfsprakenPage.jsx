import React, { useState, useEffect } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import SearchBar from "../../Components/SearchBar";
import { Link } from "@inertiajs/react";

const AfsprakenPage = ({ afspraken, filters }) => {
    const [search, setSearch] = useState(filters.search || "");
    const [filteredAfspraken, setFilteredAfspraken] = useState(afspraken);

    useEffect(() => {
        const lowerCaseSearch = search.toLowerCase();
        setFilteredAfspraken(
            afspraken.filter(
                (afspraak) =>
                    afspraak.user_id.toString().includes(lowerCaseSearch) ||
                    (afspraak.user &&
                        `${afspraak.user.voornaam} ${afspraak.user.naam}`
                            .toLowerCase()
                            .includes(lowerCaseSearch)) ||
                    afspraak.datum.toLowerCase().includes(lowerCaseSearch) ||
                    afspraak.behandeling.toLowerCase().includes(lowerCaseSearch)
            )
        );
    }, [search, afspraken]);

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-2">Afspraken Overzicht</h1>
            <hr
                className="border-blue-500 mb-6"
                style={{
                    width: "20%",
                    borderWidth: "3px",
                }}
            />

            <div className="mb-6">
                <SearchBar
                    value={search}
                    onChange={(val) => setSearch(val)}
                    onReset={() => setSearch("")}
                />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-4 py-3 text-left font-bold">Gebruiker (ID - Naam)</th>
                                <th className="px-4 py-3 text-left font-bold">Datum</th>
                                <th className="px-4 py-3 text-left font-bold">Behandeling</th>
                                <th className="px-4 py-3 text-left font-bold">Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAfspraken && filteredAfspraken.length > 0 ? (
                                filteredAfspraken.map((afspraak, index) => (
                                    <tr
                                        key={`${afspraak.user_id}-${index}`}
                                        className={
                                            index % 2 === 0
                                                ? "bg-white hover:bg-gray-50"
                                                : "bg-gray-50 hover:bg-gray-100"
                                        }
                                    >
                                        <td className="px-4 py-2 text-gray-700">
                                            {afspraak.user
                                                ? `${afspraak.user.voornaam} ${afspraak.user.naam}`
                                                : `Onbekende gebruiker`}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">{afspraak.datum}</td>
                                        <td className="px-4 py-2 text-gray-700">{afspraak.behandeling}</td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <Link
                                                href={route("admin.afspraken.edit", afspraak.afspraak_id)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="px-4 py-2 text-center text-gray-500"
                                        colSpan={4}
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
