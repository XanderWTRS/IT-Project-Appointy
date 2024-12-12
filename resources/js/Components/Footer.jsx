import React from 'react';
import { Link } from '@inertiajs/react';
import BrutalistButton from './BrutalistButton';
import '../../css/BrutalistButton.css';

const Footer = () => {
    return (
        <footer className="text-white bg-gray-800 pt-4">
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-3 text-left" style={{ marginLeft: '20rem' , gap: '15.75rem'}}>
                {/* Column 1 */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Liedent</h3>
                    <p className="mb-2 flex items-center">
                        <span className="mr-2">📍</span> Molenstraat 101 - 1770 Liedekerke
                    </p>
                    <p className="mb-2 flex items-center">
                        <span className="mr-2">✉️</span> info@liedent.be
                    </p>
                    <p className="mb-2 flex items-center">
                        <span className="mr-2">📞</span> 053 66 75 05
                    </p>
                    <p className="mb-2 flex items-center">
                        <span className="mr-2">📠</span> 053 66 67 55
                    </p>
                    <p className="flex items-center">
                        <span className="mr-2">⏰</span> 09:00 - 17:00
                    </p>
                </div>

                {/* Column 2 */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Behandelingen</h3>
                    <ul className="space-y-2">
                        <li><Link href={route('tandheelkunde')} className="hover:text-blue-600">Tandheelkunde</Link></li>
                        <li><Link href={route('orthodontie')} className="hover:text-blue-600">Orthodontie</Link></li>
                        <li><Link href={route('endodontie')} className="hover:text-blue-600">Endodontie</Link></li>
                        <li><Link href={route('paradontologie')} className="hover:text-blue-600">Paradontologie</Link></li>

                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Handige links</h3>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:text-blue-600">Team</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Contact</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Afspraak maken</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Privacy Policy</Link></li>
                    </ul>
                    <div className="mt-4">
                        <a href="#" className="text-gray-500 hover:text-blue-600">
                            <span className="inline-block bg-gray-200 rounded-full">
                                <img src="/Assets/Icons/Facebook1.svg" alt="Facebook" className="w-8 h-8" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-2 pb-2 pt-4 text-center text-sm flex" style={{flexDirection: 'column', alignItems: 'center'}}>
                <BrutalistButton/>
                &copy; {new Date().getFullYear()} Liedent. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
