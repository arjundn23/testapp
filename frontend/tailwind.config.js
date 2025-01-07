// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-orange": "#E85C40",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        bitter: ["Bitter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
