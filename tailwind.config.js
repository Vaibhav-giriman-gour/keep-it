/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        nav:{
          500:"#2e2c2f"
        },
        fontCol:{
          500:"#eee"
        },
        bgCol:{
          500:"#eee"
        },
        tempBox:{
          500:"#fff"
        }
      },
    },
  },
  plugins: [],
}