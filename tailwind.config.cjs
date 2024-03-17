/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {

    screens: {
      'sm': '600px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }


    },
    extend: {
      colors: {
        "red": "#FF0000",
        "subWhite": "#878787",
        "lowWhite": "#D9D9D9"
      },
    }
  },

  plugins: []
};

module.exports = config;