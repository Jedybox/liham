/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        subpage: "rgb(var(--subpage))",

        agree: "rgb(var(--agree))",
        disagree: "rgb(var(--disagree))",
      },
      fontFamily: {
        baybayin: ["Noto Sans Tagalog", "serif"],
        azerto: ["Azert Mono", "monospace"],
      }
    },
  },
  plugins: [],
}

