import { Head } from '@inertiajs/react';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';
import React from 'react';

export default function EndodontiePage() {
    return (
        <div>
            <Head title="Endodontie" />
            <Header />
            <div className="container">
                <h1>Endodontie</h1>
                <p>
                    Endodontie is het medisch specialisme dat zich bezighoudt met het gebit van de mens, de tanden en kiezen en de aandoeningen die daarmee gepaard kunnen gaan. De endodontist is de medisch specialist die zich bezighoudt met de preventie, diagnostiek en behandeling van aandoeningen van het gebit. De endodontist is de medisch specialist die zich bezighoudt met de preventie, diagnostiek en behandeling van aandoeningen van het gebit.
                </p>
            </div>
            <Footer />
        </div>
    );
}
