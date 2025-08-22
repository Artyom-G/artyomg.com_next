/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Add your custom colors here
      colors: {
        primary: {
          DEFAULT: '#093b28',
          hover: '#0e312e',
          light: '#195232',
        },
        secondary: {
          DEFAULT: '#a6c267',
          hover: '#5f8d45',
        },
        tertiary: '#434D60',
        'custom-text': {
          DEFAULT: '#cac7e7',
          dark: '#1e1c33',
          accent: '#899dc9',
        },
        'custom-background': {
          DEFAULT: '#13211b',
          dark: '#b8be95',
        },
        'custom-white': '#f7f8f6',
        'custom-black': '#100f0a',
      },
      // Add your custom font families here
      fontFamily: {
        'roboto-slab': ['"Roboto Slab"', 'serif'],
        'merriweather': ['"Merriweather"', 'serif'],
      },
      // Add your custom background gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(158deg, rgba(8,36,37,1) 0%, rgba(9,60,50,1) 13%, rgba(11,71,53,1) 39%, rgba(7,75,57,1) 62%, rgba(11,51,52,1) 88%, rgba(8,32,45,1) 100%)',
        'gradient-particles': 'linear-gradient(142deg, rgba(17,111,113,1) 0%, rgba(20,153,102,1) 10%, rgba(22,193,81,1) 23%, rgba(21,161,66,1) 47%, rgba(15,88,68,1) 74%, rgba(8,32,45,1) 100%)',
      },
      // You can also define your box-shadow as a utility
      boxShadow: {
        'custom': '12px 7px 15px 0px rgba(12, 56, 52, 0.56)',
      }
    },
  },
  plugins: [],
}
