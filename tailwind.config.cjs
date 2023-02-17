/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work SansVariable"],
        serif: ["Source Serif Pro"],
      },
      boxShadow: {
        resting: `
          0px 1px 2px 0 var(--tw-shadow-color),
          0px 3px 3px 0 var(--tw-shadow-color),
          0px 6px 4px 0 var(--tw-shadow-color)
        `,
        active: `
          0px 1px 3px 0 var(--tw-shadow-color),
          0px 6px 6px 0 var(--tw-shadow-color),
          0px 12px 6px -4px var(--tw-shadow-color)
        `,
      },
    },
  },
  plugins: [],
};
