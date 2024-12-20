import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const Header = ({ authUser }) => {
    const { auth } = usePage().props; // Access the shared auth data
    const authUser1 = auth?.user; // Extract the logged-in user
    const userIsLoggedIn = Boolean(authUser1);

    console.log('authUser:', authUser1);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <Link href='/'>
                    <div className="flex items-center">
                        <img
                            src="/Assets/IMG/logo_liedent.png"
                            alt="Liedent Logo"
                            className="h-14"
                        />
                    </div>
                </Link>
                                {/* Hamburger Menu for small screens */}
                                <button
                    onClick={toggleMenu}
                    className="md:hidden flex items-center space-x-2 p-2"
                >
                    <span className="block w-6 h-0.5 bg-gray-800"></span>
                    <span className="block w-6 h-0.5 bg-gray-800 mt-1"></span>
                </button>

                {/* Navigation */}
                <nav className={`flex space-x-6 text-gray-800 text-lg md:flex ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
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
                        <div className="absolute left-0 top-full w-48 bg-white border rounded-md shadow-lg hidden group-hover:block pb-1">
                            <Link href="/tandheelkunde" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src="/Assets/Icons/tandheelkunde.png" alt="Tandheelkunde Icon" className="h-5 w-5" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Tandheelkunde
                                </span>
                            </Link>
                            <Link href="/orthodontie" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src="/Assets/Icons/orthodontie.png" alt="Orthodontie Icon" className="h-5 w-5" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Orthodontie
                                </span>
                            </Link>
                            <Link href="/endodontie" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src="/Assets/Icons/endondontie.png" alt="Endodontie Icon" className="h-5 w-5" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Endodontie
                                </span>
                            </Link>
                            <Link href="/paradontologie" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                <img src="/Assets/Icons/paradontologie.png" alt="Parodontologie Icon" className="h-5 w-5" />
                                <span className="relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                                    Parodontologie
                                </span>
                            </Link>
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

                {/* Profile & Logout */}
                <div className="flex items-center relative z-50">
                    {/* Appointment Button */}
                    <div className="flex items-center">
                        <Link
                            href="/afspraak-selectie"
                            className="bg-blue-600 text-white py-2 px-4 hover:bg-blue-500 -ml-14 rounded-3xl"
                        >
                            Afspraak Maken
                        </Link>
                    </div>

                    {/* Profile with Dropdown */}
                    <div className="relative group ml-4">
                        <button className="flex items-center space-x-2 relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full">
                            <img src="/Assets/Icons/Profile.svg" alt="Profile Icon" className="h-10" />
                        </button>
                        <div className="absolute left-0 top-[calc(100%+4px)] w-48 bg-white border rounded-md shadow-lg hidden group-hover:block pb-1 -ml-36">
                            <a
                                href={userIsLoggedIn ? "/profile/edit" : "/register"}
                                className="flex items-center px-4 py-2 text-gray-700 space-x-2"
                            >
                                <img src="/Assets/Icons/Profile.svg" alt="Profile Icon" className="h-6 w-6" />
                                <span className="hover:underline">Profiel</span>
                            </a>
                            {userIsLoggedIn && (
                                <>
                                    <a href="/afspraken" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                        <img src="/Assets/Icons/Letter.svg" alt="Appointments Icon" className="h-5 w-5" />
                                        <span className="hover:underline">Afspraken</span>
                                    </a>
                                    <a href="/meldingen" className="flex items-center px-4 py-2 text-gray-700 space-x-2">
                                        <img src="/Assets/Icons/Clock.svg" alt="Notifications Icon" className="h-5 w-5" />
                                        <span className="hover:underline">Meldingen</span>
                                    </a>
                                    <form id="logout-form" method="POST" action="/logout" style={{ display: 'none' }}>
                                        <input
                                            type="hidden"
                                            name="_token"
                                            value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')}
                                        />
                                    </form>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById('logout-form').submit();
                                        }}
                                        className="flex items-center px-4 py-2 text-gray-700 space-x-2"
                                    >
                                        <img src="/Assets/Icons/logout.svg" alt="Logout Icon" className="h-5 w-5" />
                                        <span className="hover:underline">Logout</span>
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
