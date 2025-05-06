/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sage-light': '#F0F2EA',
        'sage': '#94A889',
        'cream': '#FDF8F4',
        'forest-green': '#2C4A3B',
        'brown-dark': '#594A42',
        'brown-light': '#8C7B75',
        'purple': '#9B6B9D',
        'olive': '#6F6D25',
      },
      fontFamily: {
        'serif': ['Lora', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
} 