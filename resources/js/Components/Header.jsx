import React from 'react';
import { Link } from '@inertiajs/react';

const Header = () => {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src="/Assets/IMG/logo_liedent.png"
                        alt="Liedent Logo"
                        className="h-14"
                    />
                </div>

                {/* Navigation */}
                <nav className="flex space-x-6 text-gray-800 text-lg">
                    <a
                        href="#home"
                        className="relative hover:text-blue-600 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full"
                    >
                        Home
                    </a>
                    <a
                        href="#treatments"
                        className="relative hover:text-blue-600 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full"
                    >
                        Behandelingen
                    </a>
                    <a
                        href="#team"
                        className="relative hover:text-blue-600 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full"
                    >
                        Team
                    </a>
                    <a
                        href="#contact"
                        className="relative hover:text-blue-600 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full"
                    >
                        Contact
                    </a>
                </nav>

                <div className='flex items-center'>
                    {/* Appointment Button */}
                    <div className="flex items-center space-x-4">
                        <a
                            href="#appointment"
                            className="bg-blue-600 text-white py-2 px-4 hover:bg-blue-500 -ml-14 rounded-3xl"
                        >
                            Afspraak Maken
                        </a>
                    </div>
                    <Link href="/register">
                        <button className="flex items-center space-x-2 ml-4">
                            <img src="/Assets/Icons/Profile.svg" alt="Button Icon" className="h-10" />
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
