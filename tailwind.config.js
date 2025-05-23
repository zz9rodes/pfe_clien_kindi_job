/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#1c1c1e', 
        bacdrop_modal:'rgb(117 110 110 / 55%)'
      },
      fontFamily:{
        nunito:["Nunito", 'serif'],
        suse:["SUSE", 'serif']
      }

    },
  },
  plugins: [],
}

