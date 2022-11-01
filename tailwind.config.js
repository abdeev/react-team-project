/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'backdrop': 'rgba(0 ,0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}
