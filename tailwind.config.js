/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "selector",
    theme: {
        extend: {
            colors: {
                "gray-500": "#333333",
                "gray-300": "#3c3c3c"
            },
            container: {
                center: true,
                padding: "20px"
            },
            aspectRatio: {
                "4/4": "4 / 5"
            }
        },
    },
    plugins: [],
}

