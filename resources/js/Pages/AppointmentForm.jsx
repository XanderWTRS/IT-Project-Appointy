import React, { useState } from "react";
export default function AppointmentForm({ notifications_email, notifications_gsm, csrf_token }) {
    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Afspraak vastleggen</h2>
            <p className="mb-4">
                U wordt eerst in een <strong>wachtlijst</strong> gezet aangezien wij veel patiënten te werk gaan.
                Zodra het uw beurt is zal u een <strong>mail</strong> of <strong>sms</strong> ontvangen om een afspraak
                vast te leggen.
            </p>
            <p className="mb-4">
                Bij een <strong>eerste consultatie</strong> wordt er besproken welke behandelingen nodig zijn voor u.
                Hier gaan wij ook een dosier openen op uw naam.
            </p>
            <p className="mb-4">
                Er wordt ook om een <strong>voorschot</strong> gevraagd zodat we zeker zijn dat u op uw consultatie
                aanwezig zal zijn. Dit bedraagt <strong>€25</strong>.
            </p>
            <p className="mb-4 text-1xl text-red-500">Op dit moment bedraagt de wachlijst +- 3 maanden!</p>

            <form action="/appointment" method="POST">
    {/* CSRF Token */}
    <input type="hidden" name="_token" value={csrf_token} />

    {/* Treatment Selection */}
    <label htmlFor="treatment" className="block mb-2 font-medium">
        Kies behandeling:
    </label>
    <select
        id="treatment"
        name="treatment"
        className="w-full p-2 mb-4 border rounded"
        required
    >
        <option value="">-- Selecteer een behandeling --</option>
        <option value="classic">Classic</option>
        <option value="orthodontie">Orthodontie</option>
    </select>

    {/* Notification Options */}
    <fieldset className="mb-4">
        <legend className="block mb-2 font-medium">Herinneringen:</legend>
        <div>
            {/* Hidden Input for Default Value */}
            <input type="hidden" name="keuze_email" value="0" />
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="keuze_email"
                    value="1"
                    defaultChecked={notifications_email}
                    className="mr-2"
                />
                Email
            </label>
        </div>
        <div>
            {/* Hidden Input for Default Value */}
            <input type="hidden" name="keuze_sms" value="0" />
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="keuze_sms"
                    value="1"
                    defaultChecked={notifications_gsm}
                    className="mr-2"
                />
                GSM (€0.5/sms)
            </label>
        </div>
    </fieldset>

    {/* Terms and Conditions */}
    <div className="mb-4">
        <label className="flex items-center">
            <input
                type="checkbox"
                name="agreedToTerms"
                value="1"
                required
                className="mr-2"
            />
            Ik ga akkoord met het{" "}
            <a href="#" className="text-blue-500 underline">
                afspraak reglement
            </a>
        </label>
    </div>

    {/* Submit Button */}
    <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
    >
        Sta in wachtlijst
    </button>
</form>
        </div>
    );
}

