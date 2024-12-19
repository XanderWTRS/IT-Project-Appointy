import InputError from '/resources/js/Components/InputError';
import InputLabel from '/resources/js/Components/InputLabel';
import PrimaryButton from '/resources/js/Components/PrimaryButton';
import TextInput from '/resources/js/Components/TextInput';
import Header from '/resources/js/Components/Header';
import Footer from '/resources/js/Components/Footer';
import Checkbox from '/resources/js/Components/Checkbox';
import ConfirmationAnimation from '/resources/js/Components/ConfirmationAnimation';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios'; // Zorg ervoor dat axios geïnstalleerd is
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        setProcessing(true);
        setErrors({});

        try {
            const response = await axios.post(route('login'), data);

            if (response.status === 200 && response.data.redirect) {
                // Redirect based on the server response
                window.location.href = response.data.redirect;
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Display validation errors
            }
        } finally {
            setProcessing(false);
        }
    };


    return (
        <div className="w-full h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex flex-col justify-center items-center flex-grow bg-white">
                <Head title="Log in" />
                <form
                    onSubmit={submit}
                    className="w-full max-w-4xl px-8 py-10 bg-gray-100 shadow-md rounded-md"
                >
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block mb-12 -mt-4">
                            Log in
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"></span>
                        </h1>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData({ ...data, remember: e.target.checked })}
                            />
                            <span className="ml-2 text-sm text-gray-700">Remember me</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                            >
                                Bent u uw wachtwoord vergeten?
                            </Link>
                        )}

                        <Link
                            href={route('register')}
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                        >
                            Heeft u nog geen account? Registreer nu!
                        </Link>

                        <PrimaryButton className="ml-4" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <ConfirmationAnimation show={showConfirmation} />
            <Footer />
        </div>
    );
}
