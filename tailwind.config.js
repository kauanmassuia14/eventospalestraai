/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0096D6',
          dark: '#0077AB',
          light: '#33ABDF',
        },
        dark: '#000000',
        light: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
        accent: ['Caveat', 'cursive'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 150, 214, 0.5), 0 0 40px rgba(0, 150, 214, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 150, 214, 0.8), 0 0 60px rgba(0, 150, 214, 0.5)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
