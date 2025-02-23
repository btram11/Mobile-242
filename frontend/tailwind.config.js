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
        primary: "#000000",
        primarylight: "#BCC1CD",
        primarydark: "#FFFFFF",
        secondary: "#FFFFFF",
        secondarylight: "#B0DDC9",
        secondarydark: "#00664F",
        secondarydarkdark: "#024435",
        lightred: '#DB5E5E', 
        darkred: '#C61010',
        lightyellow: '#FFBB29',
        lightorange: '#FFD5C7',
        lightblue: '#B1D3FF'
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