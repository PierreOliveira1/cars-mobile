/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#000000",
        tertiary: "#FFFFFF",
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};
