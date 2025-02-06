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

        primaryConvo: "rgb(var(--primary-convo))",
        secondaryConvo: "rgb(var(--secondary-convo))",

        isOnline: "rgb(var(--is-online))",
        isOffline: "rgb(var(--is-offline))",
      },

      boxShadow: {
        iconLog: "0px 8px 4px 0px rgba(0, 0, 0, 0.25)",
        inputfield: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        subpageshadow: "0px 10px 4px rgba(0, 0, 0, 0.25)",
      },

      fontFamily: {
        baybayin: ["Noto Sans Tagalog", "serif"],
        azert: ["Azert Mono", "monospace"],
      },
      
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },

      keyframes: {
        shrink: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },

      animation: {
        shrink: "shrink 0.5s ease-in-out forwards 1",
      },

    },
  },
  plugins: [],
}

