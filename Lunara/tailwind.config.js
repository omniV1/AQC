/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FAF7F2',
        'brown': '#6B4D37',
        'sage': '#8C9A8C',
        'purple': '#9D98B5',
        'warm-brown': '#8B7355',
        'soft-rose': '#FFE4E1',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Lato', 'sans-serif'],
      },
      maxWidth: {
        'readable': '65ch',
      },
    },
  },
  plugins: [],
} 