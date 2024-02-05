/** @type {import('tailwindcss').Config} */


// tailwind.config.js using ESM syntax
export default {
  content: ['./src/**/*.{astro,html,js}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#191919',  // Adjust the hex value to match your design
        'dark-card': '#232323', // Adjust the hex value to match your design
        'darker-card': '#1d1d1d',
        'dark-accent': '#757575', // Adjust the hex value to match your design
        'dark-text': '#EEEEEE', // Adjust the hex value to match your design
        // Add other colors from your design as needed
      },
    },
  },
  plugins: [],
  darkMode: 'class', // 'media' or 'class'
};


