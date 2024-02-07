/** @type {import('tailwindcss').Config} */


// tailwind.config.js using ESM syntax
export default {
  content: ['./src/**/*.{astro,html,js}'],
  theme: {
    extend: {

      borderRadius: {
        'lg': '3rem',
        'md': '1rem',
      },

      

      colors: {
        'dark-bg': '#0d0d0d',  // Adjust the hex value to match your design
        'dark-card': '#1a1a1a', // Adjust the hex value to match your design
        'darker-card': '#121212',
        'dark-accent': '#757575', // Adjust the hex value to match your design
        'dark-text': '#EEEEEE', // Adjust the hex value to match your design
        // Add other colors from your design as needed
      },

  fontFamily: {
        'header': ['Montserrat', 'serif'], // For headers, using Montserrat with weight 700
        'body': ['Montserrat', 'sans-serif'], // For body text, using Montserrat with weight 400
      },

    },
  },
  plugins: [],
  darkMode: 'class', // 'media' or 'class'
};


