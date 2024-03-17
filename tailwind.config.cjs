/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    colors: {
      "red": "#FF0000",
      "subWhite": "#878787"
    },
    screens: {
      'sm': '600px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }


    },
    extend: {}
  },

  plugins: []
};

module.exports = config;