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
        appBg: "#000000",
        pageHeader: "#010E0F",
        pageHeaderButton: "#1E352C",
        qrHeader: "#101701",
        qrButton: "#262C1B",
        qrButtonActive: "#485236",
        noteHeader: "#262C1B",
        recordSave: "#010E0F",
        textInput: "#414A44",
        headerText: "#5D6660",
        headerBText: "#5D6660",
        headerBorder: "#5D6660",
        qSBorder: "#343B36",
        rText: "#040404",
        ttt: "#B5B5B5",
        noteText: "#9A9A9A",
        ott: "#828282",
        selectT: "#000000",
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
