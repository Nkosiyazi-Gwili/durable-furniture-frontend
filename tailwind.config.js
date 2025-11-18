/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef8ed',
          100: '#fdeed6',
          500: '#E69216', // Brand orange
          600: '#BC1C12', // Brand red
          700: '#a51810',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          400: '#919191', // Brand gray
          600: '#4D4D4D', // Brand dark gray
          800: '#262626',
          900: '#000000', // Brand black
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}