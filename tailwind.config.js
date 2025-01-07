/** @type {import('tailwindcss').Config} */

// tailwind.config.js using ESM syntax
export default {
	content: ['./src/**/*.{astro,html,js}'],
	theme: {
		extend: {
			borderRadius: {
				lg: '3rem',
				md: '1rem'
			},

			fontSize: {
				xxl: ['12rem', '10rem']
			},

			screens: {
				'3xl': '1920px'
			},

			maxWidth: {
				1920: '1920px',
				1970: '1970px'
			},

			gradientColorStops: (theme) => ({
				...theme('colors'),
				gradient:
					'linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'
			}),

			backgroundImage: {
				'about-gradient': 'linear-gradient(32deg, rgb(69, 69, 186) 0%, rgba(0,212,255,1) 100%)'
			},
			textColor: {
				transparent: 'transparent'
			},

			colors: {
				'dark-bg': '#0d0d0d', // Adjust the hex value to match your design
				'dark-card': '#1a1a1a', // Adjust the hex value to match your design
				'darker-card': '#121212',
				'dark-accent': '#959595', // Adjust the hex value to match your design
				'dark-text': '#038cd0', // Adjust the hex value to match your design
				white: '#FFF',
				orange: '#FF5FF6'
			},

			fontFamily: {
				header: ['Poppins', 'sans-serif'], // For headers, using Montserrat with weight 700
				body: ['Poppins', 'sans-serif'] // For body text, using Montserrat with weight 400
			},
			fontWeight: {
				header: '700', // Adding a custom weight
				body: '400'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')],
	darkMode: 'class' // 'media' or 'class'
}
