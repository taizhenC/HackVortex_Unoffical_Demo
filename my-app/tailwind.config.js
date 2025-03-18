/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      // Add any other file patterns that contain your classes
    ],
    theme: {
      extend: {
        colors: {
          'header': '#161616', // Custom color for background
        },
      },
    },
    plugins: [],
  }