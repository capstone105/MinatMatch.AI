module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#9476F1",
      },
      textShadow: {
        heavy: "0 8px 20px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-heavy': {
          textShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
        },
      }, ['responsive'])
    },
  ],
};
