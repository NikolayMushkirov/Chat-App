/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        indigoMainColor: "#2f267b",
        indigoLightColor: '#6656ab',
        chatBodyColor: '#F8F8F8'
      },
    },
  },
  plugins: [],
};
