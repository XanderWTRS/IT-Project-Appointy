import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from "../../Layouts/AdminLayout";
import FlipCardAdmin from '/resources/js/Components/FlipCardAdmin';
import axios from 'axios';

const PersoneelPage = () => {

    const [teamIds, setTeamIds] = useState([]);
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        const fetchTeamIds = async () => {
            try {
                const response = await axios.get('/admin/team-ids');
                setTeamIds(response.data);
            } catch (error) {
                console.error('Failed to fetch team IDs:', error);
            }
        };

        fetchTeamIds();
    }, []);

    const visibleCards = showAll ? teamIds : teamIds.slice(0, 4);

    return (
        <AdminLayout>
        <Head title="Personeel" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 mt-4">
            Team
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
        </h1>
        <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ease-in-out`}
        >
            {/* Empty Card */}
            <a href='/admin/add-personeel'
            className="flex justify-center items-center border border-dashed border-gray-400 rounded-lg h-40 cursor-pointer hover:bg-gray-100"
            >
            <span className="text-gray-500 font-medium">+ Voeg nieuw lid toe</span>
            </a>

            {/* FlipCards */}
            {visibleCards.map((id) => (
            <FlipCardAdmin key={id} id={id} />
            ))}
        </div>
        </AdminLayout>
    );
};

export default PersoneelPage;
