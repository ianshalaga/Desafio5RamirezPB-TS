/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,handlebars}", "./src/**/**/*.handlebars"],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms'),],
};
