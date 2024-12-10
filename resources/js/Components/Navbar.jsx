import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <span className="text-blue-500">Liedent</span>
        </div>
        {/* User Icon */}
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A7.5 7.5 0 0112 15a7.5 7.5 0 016.879 2.804M15 11a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
      </div>
      <nav className="bg-blue-500 text-white">
        <ul className="flex space-x-4 px-4 py-2">
          <li>
            <a href="/dashboard" className="hover:text-gray-200">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/klanten" className="hover:text-gray-200">
              Klanten
            </a>
          </li>
          <li>
            <a href="/klant-toevoegen" className="hover:text-gray-200">
              Klant toevoegen
            </a>
          </li>
          <li>
            <a href="/personeel" className="hover:text-gray-200">
              Personeel
            </a>
          </li>
          <li>
            <a href="/agenda" className="hover:text-gray-200">
              Agenda
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
