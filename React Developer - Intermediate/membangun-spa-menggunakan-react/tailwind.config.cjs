/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  darkMode: ["class", "[data-theme=\"dark\"]"],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        ...colors,
        color: {
          border: {
            DEFAULT: colors.gray[200],
            dark: colors.gray[700],
            disabled: colors.gray[100],
          },
          background: {
            DEFAULT: colors.white,
            dark: colors.gray[900],
            alt: {
              DEFAULT: colors.gray[100],
              dark: colors.gray[800],
            },
          },
          primary: {
            DEFAULT: colors.indigo[500],
            hover: colors.indigo[400],
          },
          headline: {
            DEFAULT: colors.gray[900],
            dark: colors.gray[100],
          },
          base: {
            DEFAULT: colors.gray[600],
            dark: colors.gray[400],
          },
        },
      }),
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
};
