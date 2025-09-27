export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],


  
  theme: {
    extend: {
      colors: {
        ocean: {
          dark: "#001d3d",    // deep navy
          blue: "#0077b6",    // strong blue
          aqua: "#00b4d8",    // bright aqua
          pastel: "#90e0ef",  // soft pastel cyan
          foam: "#caf0f8",    // lightest foam-blue
        },
      },
      fontFamily: {
        hobo: ['Hobo', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
        hobo: ['"Fredoka One"', 'cursive'],
      }
    },
  },
  plugins: [],
}



