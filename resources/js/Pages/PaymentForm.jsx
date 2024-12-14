import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import InputError from '/resources/js/Components/InputError';
import InputLabel from '/resources/js/Components/InputLabel';
import PrimaryButton from '/resources/js/Components/PrimaryButton';
import TextInput from '/resources/js/Components/TextInput';

export default function PaymentForm() {
    const { props } = usePage();
    const { flash } = props;
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (flash.success || flash.error) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Afspraak Vastleggen</h2>

            {visible && flash.success && (
                <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
                    {flash.success}
                </div>
            )}
            {visible && flash.error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                    {flash.error}
                </div>
            )}

            <p className="text-gray-700 mb-4">
                U wordt eerst in een <strong>wachtlijst</strong> gezet. Zodra het uw beurt is, ontvangt u een
                <strong>mail</strong> of <strong>sms</strong> om een afspraak vast te leggen.
            </p>

            <p className="text-gray-700 mb-4">
                Bij een <strong>eerste consultatie</strong> bespreken we welke behandelingen nodig zijn en openen we een dossier op uw naam.
            </p>

            <p className="text-gray-700 mb-4">
                Voor een consultatie vragen we een <strong>voorschot</strong> van <strong>€25</strong> om zeker te zijn dat u aanwezig bent.
            </p>

            <p className="text-red-600 font-semibold text-lg mb-6">
                Let op: de huidige wachttijd bedraagt ongeveer 3 maanden!
            </p>

            <form action={route('payment.paypositionwaitlist')} method="post" className="space-y-6">
                <input type="hidden" name="_token" value={props.csrf_token} />

                <div>
                    <InputLabel htmlFor="treatment" value="Kies behandeling:" />
                    <select
                        id="treatment"
                        name="treatment"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        required
                    >
                        <option value="">-- Selecteer een behandeling --</option>
                        <option value="classic">Classic</option>
                        <option value="orthodontie">Orthodontie</option>
                    </select>
                </div>

                <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-2">Herinneringen:</legend>
                    <div className="flex items-center mb-2">
                        <input type="hidden" name="keuze_email" value="0" />
                        <label className="flex items-center">
                            <TextInput
                                type="checkbox"
                                name="keuze_email"
                                value="1"
                                defaultChecked={props.keuze_email}
                                className="mr-2"
                            />
                            Email
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input type="hidden" name="keuze_sms" value="0" />
                        <label className="flex items-center">
                            <TextInput
                                type="checkbox"
                                name="keuze_sms"
                                value="1"
                                defaultChecked={props.keuze_sms}
                                className="mr-2"
                            />
                            GSM (€0.5/sms)
                        </label>
                    </div>
                </fieldset>

                <div>
                    <InputLabel htmlFor="agreedToTerms" value="" />
                    <label className="flex items-center text-gray-700">
                        <TextInput
                            type="checkbox"
                            name="agreedToTerms"
                            value="1"
                            required
                            className="mr-2"
                        />
                        Ik ga akkoord met het{' '}
                        <a href="#" className="text-blue-500 underline">
                            afspraak reglement
                        </a>
                    </label>
                    <InputError message={props.errors?.agreedToTerms} />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
                >
                    Betaal €25.00
                </button>
            </form>
        </div>
    );
}
