import React from 'react';
import { Link } from '@inertiajs/react'; // If you're using Inertia's Link component
import '/resources/css/SidebarUser.css';

const Sidebar = () => {
    console.log("Sidebar is being rendered");
    return (
        <div className="sidebar">
            <ul className="sidebar-links">
                {/* Profiel -> uses the named route: profile.edit */}
                <li>
                    <Link href={route('profile.edit')}>
                        Profiel
                    </Link>
                </li>

                {/* Afspraken -> uses the named route: afspraken */}
                <li>
                    <Link href={route('afspraken')}>
                        Afspraken
                    </Link>
                </li>

                {/* Meldingen -> No named route given in web.php. If you have one, use it here.
                    Otherwise, link to a placeholder or remove this link. */}
                <li>
                    <Link href={route('meldingen')}>
                        Meldingen
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
