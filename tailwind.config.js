/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flyIn: {
          '0%': { opacity: 0, transform: 'translateY(-50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-top': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-top-left': {
          '0%': { transform: 'translate(-100%, -100%)', opacity: '0' },
          '100%': { transform: 'translate(0, 0)', opacity: '1' },
        },
        'slide-in-top-right': {
          '0%': { transform: 'translate(100%, -100%)', opacity: '0' },
          '100%': { transform: 'translate(0, 0)', opacity: '1' },
        },
        'slide-in-bottom-left': {
          '0%': { transform: 'translate(-100%, 100%)', opacity: '0' },
          '100%': { transform: 'translate(0, 0)', opacity: '1' },
        },
        'slide-in-bottom-right': {
          '0%': { transform: 'translate(100%, 100%)', opacity: '0' },
          '100%': { transform: 'translate(0, 0)', opacity: '1' },
        },
      },
      animation: {
        'fly-in': 'flyIn 1s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-in': 'slideIn 1s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 1.5s ease-out',
        'slide-in-top': 'slide-in-top 0.5s ease-out',
        'slide-in-bottom': 'slide-in-bottom 0.5s ease-out',
        'slide-in-top-left': 'slide-in-top-left 0.5s ease-out',
        'slide-in-top-right': 'slide-in-top-right 0.5s ease-out',
        'slide-in-bottom-left': 'slide-in-bottom-left 0.5s ease-out',
        'slide-in-bottom-right': 'slide-in-bottom-right 1.5s ease-out',
      },
    },
  },
  variants: {},
  plugins: [],
}
