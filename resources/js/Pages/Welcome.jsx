import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="font-sans">
            <Header auth={auth} />

                {/* Hero Section */}
                <main
                    className="relative bg-gray-100 h-[70vh]"
                    style={{
                        backgroundImage: `url('/Assets/IMG/Hero.png')`,
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
                            className="bg-blue-600 text-white py-3 px-6 rounded-3xl hover:bg-blue-500"
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
