import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                swing: 'swing 0.75s ease-in-out',
            },
            keyframes: {
                swing: {
                    '0%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-15deg)' },
                    '50%': { transform: 'rotate(15deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
            },
        },
    },

    plugins: [forms],
};
