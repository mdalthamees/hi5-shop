/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          50: '#ffe5e5',
          100: '#ffc7c7',
          200: '#ff9b9b',
          300: '#ff6a6a',
          400: '#ff3b3b',
          500: '#ff0000',
          600: '#ff0000',
          700: '#ff0000',
          800: '#d60000',
          900: '#a80000',
          950: '#3b0000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Tamil', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Noto Sans Tamil', 'ui-serif', 'Georgia', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { fadeIn: 'fadeIn 0.4s ease-out' },
    },
  },
  plugins: [],
};
