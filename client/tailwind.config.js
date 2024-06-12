module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: "'Poppins', sans",
      },
      colors: {
        "site-bg": "#faf4f2",
        "button-red": "#FB5B4F",
        "button-hover-red": "#f2473a",
        "card-orange": "#fa7c5c",
        "site-black": "#260b00",
      },
      keyframes: {
        moveUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        moveDown: {
          '0%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        moveUp: 'moveUp 0.3s ease-out forwards',
        moveDown: 'moveDown 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
