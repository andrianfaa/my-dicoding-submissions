/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const defaultTheme = require("windicss/defaultTheme");
const colors = require("windicss/colors");
const lineClamp = require("windicss/plugin/line-clamp");

module.exports = {
  extract: {
    include: [
      "./src/**/*.{js,jsx}",
    ],
    exclude: ["./node_modules"],
  },
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1080px",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        color: {
          headline: {
            DEFAULT: colors.slate[800],
            dark: colors.slate[100],
          },
          text: {
            DEFAULT: colors.slate[500],
            dark: colors.slate[400],
          },
          background: {
            DEFAULT: colors.slate[50],
            dark: colors.dark[900],
            alt: {
              DEFAULT: colors.slate[200],
              dark: colors.slate[800],
            },
          },
          primary: {
            DEFAULT: "#3b82f6",
          },
          border: {
            DEFAULT: colors.slate[200],
            active: colors.slate[400],
            dark: {
              DEFAULT: colors.gray[800],
              active: colors.gray[600],
            },
          },
          button: {
            base: {
              DEFAULT: colors.slate[200],
              hover: colors.slate[300],
              dark: {
                DEFAULT: colors.gray[800],
                hover: colors.gray[600],
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    lineClamp,
  ],
};
