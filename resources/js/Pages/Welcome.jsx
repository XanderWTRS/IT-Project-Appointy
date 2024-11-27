import { Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="font-sans">
                {/* Header Section */}
                <header className="bg-white shadow">
                    <div className="container mx-auto flex justify-between items-center py-4 px-6">
                        {/* Logo */}
                        <div className="flex items-center">
                            <img
                                src="/path-to-logo.png" // Replace with your logo image path
                                alt="Liedent Logo"
                                className="h-10"
                            />
                            <span className="ml-2 text-2xl font-bold text-gray-800">Liedent</span>
                        </div>

                        {/* Navigation */}
                        <nav className="flex space-x-6 text-gray-800">
                            <a href="#home" className="hover:text-blue-600">
                                Home
                            </a>
                            <a href="#treatments" className="hover:text-blue-600">
                                Behandelingen
                            </a>
                            <a href="#team" className="hover:text-blue-600">
                                Team
                            </a>
                            <a href="#contact" className="hover:text-blue-600">
                                Contact
                            </a>
                        </nav>

                        {/* Appointment Button */}
                        <div className="flex items-center space-x-4">
                            <a
                                href="#appointment"
                                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                            >
                                Afspraak Maken
                            </a>
                            <button className="text-gray-800">
                                <i className="fas fa-user-circle text-2xl"></i> {/* User icon */}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main
                    className="relative bg-gray-100"
                    style={{
                        backgroundImage: `url('/path-to-background-image.jpg')`, // Replace with your hero background image path
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="relative container mx-auto py-32 px-6 text-white text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            Tandartsen Praktijk Liedent
                        </h1>
                        <p className="text-lg font-light mb-6">
                            Tandheelkunde - Orthodontie - Endodontie - Parodontologie
                        </p>
                        <a
                            href="#appointment"
                            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-500"
                        >
                            Afspraak Maken
                        </a>
                    </div>
                </main>

                {/* Footer (if needed) */}
                <footer className="bg-gray-800 text-white py-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Liedent. All Rights Reserved.</p>
                </footer>
            </div>
        </>
    );
}
