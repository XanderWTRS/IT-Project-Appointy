import { useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformationForm({ className, user, mustVerifyEmail, status }) {
    const { data, setData, put, processing, errors } = useForm({
        voornaam: user.voornaam || '',
        naam: user.naam || '',
        email: user.email || '',
        geboortedatum: user.geboortedatum || '',
        mutualiteit: user.mutualiteit || '',
        rijksregister_nr: user.rijksregister_nr || '',
        tandarts: user.tandarts || '',
        gsm_nummer: user.gsm_nummer || '',
        keuze_sms: user.keuze_sms || '',
        keuze_email: user.keuze_email || '',
        betaald: user.betaald || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('profile.update'));
    };

    return (
        <form onSubmit={submit} className={className}>
            <div>
                <label htmlFor="voornaam">Voornaam</label>
                <input
                    id="voornaam"
                    type="text"
                    value={data.voornaam}
                    onChange={e => setData('voornaam', e.target.value)}
                />
                {errors.voornaam && <div className="text-red-600">{errors.voornaam}</div>}
            </div>

            <div>
                <label htmlFor="naam">Naam</label>
                <input
                    id="naam"
                    type="text"
                    value={data.naam}
                    onChange={e => setData('naam', e.target.value)}
                />
                {errors.naam && <div className="text-red-600">{errors.naam}</div>}
            </div>

            <div>
                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                />
                {errors.email && <div className="text-red-600">{errors.email}</div>}
            </div>

            <div>
                <label htmlFor="geboortedatum">Geboortedatum</label>
                <input
                    id="geboortedatum"
                    type="date"
                    value={data.geboortedatum}
                    onChange={e => setData('geboortedatum', e.target.value)}
                />
                {errors.geboortedatum && <div className="text-red-600">{errors.geboortedatum}</div>}
            </div>

            <div>
                <label htmlFor="mutualiteit">Mutualiteit</label>
                <input
                    id="mutualiteit"
                    type="text"
                    value={data.mutualiteit}
                    onChange={e => setData('mutualiteit', e.target.value)}
                />
                {errors.mutualiteit && <div className="text-red-600">{errors.mutualiteit}</div>}
            </div>

            <div>
                <label htmlFor="rijksregister_nr">Rijksregister Nummer</label>
                <input
                    id="rijksregister_nr"
                    type="text"
                    value={data.rijksregister_nr}
                    onChange={e => setData('rijksregister_nr', e.target.value)}
                />
                {errors.rijksregister_nr && <div className="text-red-600">{errors.rijksregister_nr}</div>}
            </div>

            <div>
                <label htmlFor="tandarts">Tandarts</label>
                <input
                    id="tandarts"
                    type="text"
                    value={data.tandarts}
                    onChange={e => setData('tandarts', e.target.value)}
                />
                {errors.tandarts && <div className="text-red-600">{errors.tandarts}</div>}
            </div>

            <div>
                <label htmlFor="gsm_nummer">GSM Nummer</label>
                <input
                    id="gsm_nummer"
                    type="text"
                    value={data.gsm_nummer}
                    onChange={e => setData('gsm_nummer', e.target.value)}
                />
                {errors.gsm_nummer && <div className="text-red-600">{errors.gsm_nummer}</div>}
            </div>

            <div>
                <label htmlFor="keuze_sms">Keuze SMS</label>
                <input
                    id="keuze_sms"
                    type="text"
                    value={data.keuze_sms}
                    onChange={e => setData('keuze_sms', e.target.value)}
                />
                {errors.keuze_sms && <div className="text-red-600">{errors.keuze_sms}</div>}
            </div>

            <div>
                <label htmlFor="keuze_email">Keuze Email</label>
                <input
                    id="keuze_email"
                    type="text"
                    value={data.keuze_email}
                    onChange={e => setData('keuze_email', e.target.value)}
                />
                {errors.keuze_email && <div className="text-red-600">{errors.keuze_email}</div>}
            </div>

            <div>
                <label htmlFor="betaald">Betaald</label>
                <input
                    id="betaald"
                    type="text"
                    value={data.betaald}
                    onChange={e => setData('betaald', e.target.value)}
                />
                {errors.betaald && <div className="text-red-600">{errors.betaald}</div>}
            </div>

            <div className="mt-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update Profile
                </button>
            </div>

            {status && (
                <div className="mt-4 text-green-600">
                    {status}
                </div>
            )}
        </form>
    );
}
