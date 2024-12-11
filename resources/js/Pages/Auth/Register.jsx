import InputError from '/resources/js/Components/InputError';
import InputLabel from '/resources/js/Components/InputLabel';
import PrimaryButton from '/resources/js/Components/PrimaryButton';
import TextInput from '/resources/js/Components/TextInput';
import GuestLayout from '/resources/js/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        voornaam: '',
        naam: '',
        geboortedatum: '',
        mutualiteit: '',
        rijksregister_nr: '',
        tandarts: '',
        gsm_nummer: '',
        email: '',
        password: '',
        password_confirmation: '',
        keuze_sms: false,
        keuze_email: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="voornaam" value="Voornaam" />
                    <TextInput
                        id="voornaam"
                        name="voornaam"
                        value={data.voornaam}
                        className="mt-1 block w-full"
                        autoComplete="given-name"
                        onChange={(e) => setData('voornaam', e.target.value)}
                        required
                    />
                    <InputError message={errors.voornaam} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="naam" value="Naam" />
                    <TextInput
                        id="naam"
                        name="naam"
                        value={data.naam}
                        className="mt-1 block w-full"
                        autoComplete="family-name"
                        onChange={(e) => setData('naam', e.target.value)}
                        required
                    />
                    <InputError message={errors.naam} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="geboortedatum" value="Geboortedatum" />
                    <TextInput
                        id="geboortedatum"
                        type="date"
                        name="geboortedatum"
                        value={data.geboortedatum}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('geboortedatum', e.target.value)}
                        required
                    />
                    <InputError message={errors.geboortedatum} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="mutualiteit" value="Mutualiteit" />
                    <TextInput
                        id="mutualiteit"
                        name="mutualiteit"
                        value={data.mutualiteit}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('mutualiteit', e.target.value)}
                    />
                    <InputError message={errors.mutualiteit} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="rijksregister_nr" value="Rijksregister Nr" />
                    <TextInput
                        id="rijksregister_nr"
                        name="rijksregister_nr"
                        value={data.rijksregister_nr}
                        className="mt-1 block w-full"
                        maxLength="11"
                        onChange={(e) => setData('rijksregister_nr', e.target.value)}
                        required
                    />
                    <InputError message={errors.rijksregister_nr} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="tandarts" value="Tandarts" />
                    <TextInput
                        id="tandarts"
                        name="tandarts"
                        value={data.tandarts}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('tandarts', e.target.value)}
                    />
                    <InputError message={errors.tandarts} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="gsm_nummer" value="GSM Nummer" />
                    <TextInput
                        id="gsm_nummer"
                        name="gsm_nummer"
                        value={data.gsm_nummer}
                        className="mt-1 block w-full"
                        maxLength="15"
                        onChange={(e) => setData('gsm_nummer', e.target.value)}
                        required
                    />
                    <InputError message={errors.gsm_nummer} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="privacy_policy"
                            checked={data.privacy_policy}
                            onChange={(e) => setData('privacy_policy', e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Ik ga akkoord met de{' '}
                            <Link
                                href="/privacy-policy"
                                className="text-indigo-500 underline hover:text-indigo-700"
                                target="_blank"
                            >
                                Privacy Policy
                            </Link>
                        </span>
                    </label>
                    <InputError message={errors.privacy_policy} className="mt-2" />
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
