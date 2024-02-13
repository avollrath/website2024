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

      fontSize: {
        xxl: ['12rem', '10rem'],
      },

      maxWidth: {
        '1920': '1920px',
      },

      gradientColorStops: theme => ({
        ...theme('colors'),
        'gradient': 'linear-gradient(45deg, #ff6309, #ffbd06)',
      }),

      colors: {
        'dark-bg': '#0d0d0d',  // Adjust the hex value to match your design
        'dark-card': '#1a1a1a', // Adjust the hex value to match your design
        'darker-card': '#121212',
        'dark-accent': '#757575', // Adjust the hex value to match your design
        'dark-text': '#45CE8A', // Adjust the hex value to match your design
      },

  fontFamily: {
        'header': ['Montserrat', 'serif'], // For headers, using Montserrat with weight 700
        'body': ['Montserrat', 'sans-serif'], // For body text, using Montserrat with weight 400
      },

    },
  },
  plugins: [ require('@tailwindcss/typography'),],
  darkMode: 'class', // 'media' or 'class'
};


