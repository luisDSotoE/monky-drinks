/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#050505',
        'neon-yellow': '#FFD600',
        'neon-pink': '#FF00B8',
        'neon-blue': '#00BFFF',
        'neon-green': '#39FF14',
        'neon-orange': '#FF7300',
        'neon-purple': '#8A2BE2',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}