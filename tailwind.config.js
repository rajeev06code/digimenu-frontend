module.exports = {
  theme: {
    extend: {
      lineClamp: {
        2: "2",
      },
      animation: {
        bounce: "bounce 1s infinite",
        pulse: "pulse 1.5s infinite",
      },
    },
  },
  variants: {
    extend: {
      animation: ["responsive", "motion-safe", "motion-reduce"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    function ({ addUtilities }) {
      addUtilities({
        ".animation-delay-200": {
          "animation-delay": "200ms",
        },
        ".animation-delay-400": {
          "animation-delay": "400ms",
        },
      });
    },
  ],
};
