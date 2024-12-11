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
                    <Link
                        href="/"
                        className="relative hover:text-blue-600 after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full"
                    >
                        Home
                    </Link>

                    {/* Dropdown for Behandelingen */}
                    <div className="relative group z-50">
                        <a
                            href="/#behandelingen"
                            className="relative hover:text-blue-600 after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full"
                        >
                            Behandelingen
                        </a>
                        {/* Dropdown Menu */}
                        <div className="absolute left-0 top-full w-48 bg-white border rounded-md shadow-lg hidden group-hover:block pb-1">
                            <a href="/tandheelkunde" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src="/Assets/Icons/tandheelkunde.png" alt="Tandheelkunde Icon" className="h-5 w-5" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Tandheelkunde
                                </span>
                            </a>
                            <a href="/orthodontie" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src="/Assets/Icons/orthodontie.png" alt="Orthodontie Icon" className="h-5 w-5" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Orthodontie
                                </span>
                            </a>
                            <a href="/endodontie" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src="/Assets/Icons/endondontie.png" alt="Endodontie Icon" className="h-5 w-5" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Endodontie
                                </span>
                            </a>
                            <a href="/paradontologie" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src="/Assets/Icons/paradontologie.png" alt="Parodontologie Icon" className="h-5 w-5" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Parodontologie
                                </span>
                            </a>
                        </div>
                    </div>

                    <a
                        href="/#team"
                        className="relative hover:text-blue-600 after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full"
                    >
                        Team
                    </a>

                    {/* Dropdown for Contact */}
                    <div className="relative group z-50">
                        <a
                            href="/#contact"
                            className="relative hover:text-blue-600 after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full"
                        >
                            Contact
                        </a>
                        {/* Dropdown Menu */}
                        <div className="absolute left-0 top-full w-48 bg-white border rounded-md shadow-lg hidden group-hover:block pb-1">
                            <a href="/#contact" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src='/Assets/Icons/GSM.svg' alt="Contact Icon" className="h-6 w-6 -ml-2.5" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Contact
                                </span>
                            </a>
                            <a href="/#contacteer-ons" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src='/Assets/Icons/Letter.svg' alt="Brief Icon" className="h-5 w-5 -ml-2" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Contacteer ons
                                </span>
                            </a>
                            <a href="/#wachtdienst" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src='/Assets/Icons/Clock.svg' alt="Klok Icon" className="h-5 w-5 -ml-2" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Wachtdienst
                                </span>
                            </a>
                        </div>
                    </div>
                </nav>

                <div className="flex items-center">
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
