/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", 
    "./app/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./components/*.{js,jsx,ts,tsx}",
    "./layouts/*.{js,jsx,ts,tsx}",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#02a393",
        primarylight: "#c7f0eb",
        primarydark: "#006e63",
        secondary: "#ffa705",
        secondarylight: "#f5e7ce",
        secondarydark: "#d98d02",
      },
      fontFamily: {
        latolight: ["Lato-Light", "sans-serif"],
        latolightitalic: ["Lato-LightItalic", "sans-serif"],
        lato: ["Lato-Regular", "sans-serif"],
        latoitalic: ["Lato-Italic", "sans-serif"],
        latobold: ["Lato-Bold", "sans-serif"],
        latobolditalic: ["Lato-BoldItalic", "sans-serif"],
      }
    },
  },
  plugins: [],
}