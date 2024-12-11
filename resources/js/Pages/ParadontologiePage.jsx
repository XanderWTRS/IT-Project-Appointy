import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import React from 'react';

export default function ParadontologiePage() {
    return (
        <div>
            <Head title="Paradontologie" />
            <Header />
            <div className="container">
                <h1>Paradontologie</h1>
                <p>
                    Paradontologie is het medisch specialisme dat zich bezighoudt met het gebit van de mens, de tanden en kiezen en de aandoeningen die daarmee gepaard kunnen gaan. De paradontoloog is de medisch specialist die zich bezighoudt met de preventie, diagnostiek en behandeling van aandoeningen van het gebit. De paradontoloog is de medisch specialist die zich bezighoudt met de preventie, diagnostiek en behandeling van aandoeningen van het gebit.
                </p>
            </div>
            <Footer />
        </div>
    );
}
