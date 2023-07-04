/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pageHeader: "#062925",
        pageHeaderButton: "#044A42",
        qrHeader: "#2A474B",
        qrButton: "#044A42",
        qrButtonActive: "#867B69",
        textInput: "#466561", //#737675
      },
      spacing: {
        noteH: "70vh",
        noteW: "25vw",
        dreamH: "70vh",
        dreamW: "70vw",
        saveW: "85vw",
        saveH: "10vh",
      },
    },
  },
  plugins: [],
};
