/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-primary': '#181818',
        'convo-top': '#1D7FFF',
        'convo-bottom': '#004196',
      },
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
      gradientColorStops: {
        'convo-gradient': ['#1D7FFF 19%', '#004196 100%']
      }
    },
  },
  plugins: [],
}

