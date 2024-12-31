import React from 'react';

const SidebarUser = () => {
    console.log("Sidebar is being rendered");
    return (
        <div className="w-1/4 bg-white p-4 rounded-md shadow-md h-full">
            <ul className="space-y-4">
                <li>
                    <a href="/profile/edit" className="relative px-4 py-2 text-gray-700 font-semibold rounded flex items-center">
                        <img src="/Assets/Icons/Profile.svg" alt="icon of the profile" className="w-8 h-8 rounded-full inline-block mr-4" />
                        <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                            Profiel
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/afspraken" className="relative px-4 py-2 text-gray-700 font-semibold rounded flex items-center">
                        <img src="/Assets/Icons/Calendar.svg" alt="icon of the profile" className="w-8 h-8 inline-block mr-4" />
                        <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                            Afspraken & Boetes
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/meldingen" className="relative px-4 py-2 text-gray-700 font-semibold rounded flex items-center group">
                        <img src="/Assets/Icons/Bell.svg" alt="icon of the bell" className="w-8 h-8 rounded-full inline-block mr-4 transition-transform duration-500 group-hover:animate-swing" />
                        <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:origin-center group-hover:after:left-0 group-hover:after:w-full">
                            Meldingen
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SidebarUser;

