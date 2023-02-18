/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work SansVariable", ...defaultTheme.fontFamily.sans],
        serif: ["FrauncesVariable", ...defaultTheme.fontFamily.serif],
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
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
