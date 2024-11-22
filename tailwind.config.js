/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',            // if you're using an HTML file in the root
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS/JSX/TS/TSX files inside the 'src' folder
    './public/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

