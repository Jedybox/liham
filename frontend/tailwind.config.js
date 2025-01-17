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

      boxShadow: {
        iconLog: "0px 8px 4px 0px rgba(0, 0, 0, 0.25)",
        inputfield: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },

      fontFamily: {
        baybayin: ["Noto Sans Tagalog", "serif"],
        azerto: ["Azert Mono", "monospace"],
      }
    },
  },
  plugins: [],
}

