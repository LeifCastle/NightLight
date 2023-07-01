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
        Dark1: "#062925",
        Dark2: "#044A42",
        Light1: "#3A9188",
        Light2: "#B8E1DD",
      },
    },
  },
  plugins: [],
};
