import React from 'react';
import { Link } from '@inertiajs/react';

const BehandelingenCard = ({ title, description, afb }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 text-center relative">
            <img src={afb} alt={title} className="w-16 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-4">{title}</h3>
            <span className="absolute -ml-32 w-full h-0.5 bg-blue-500" style={{width: '75%'}}></span>
            <p className="text-sm text-gray-600 h-36 mt-10">
                {description}
            </p>
            <button className="bg-blue-500 text-white w-16 h-16 rounded-full shadow hover:bg-blue-600 flex justify-center items-center text-3xl absolute bottom-[-32px] left-1/2 transform -translate-x-1/2 transition-transform duration-500 hover:rotate-180">
                +
            </button>
        </div>

    );
}

export default BehandelingenCard;
