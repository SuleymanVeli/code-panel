/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [ 
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        light :{
          100: "#F8F8F7",
          200: "#EFEFEF",          
        },
        borderColor: "#e5e7eb",
        navColor: "hsla(0,0%,100%,.8)",
        layout: '#F8FAFD',
         
      },
      animation: {
        'gradient-animate': 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {          
          '0%, 100%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [],
})

