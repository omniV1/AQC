/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FAF7F2',
        'warm-brown': '#6B4D37',
        'sage': '#8C9A8C',
        'sage-light': '#F5F7F5',
        'forest-green': '#4A5D4C',
        'olive': '#8B8356',
        'purple': '#9D98B5',
        'soft-rose': '#F8E5E5',
        'brown': {
          DEFAULT: '#6B4D37',
          dark: '#5A3E2E',
          light: '#8E6F5A'
        }
      },
      fontFamily: {
        'sans': ['Atkinson Hyperlegible', 'system-ui', 'sans-serif'],
        'serif': ['Lora', 'serif'],
        'heading': ['Playfair Display', 'serif'],
        'body': ['Atkinson Hyperlegible', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'hero-pattern': "url('/images/leaf-pattern.png')",
        'leaf-texture': "url('/images/leaf-texture.png')"
      },
      maxWidth: {
        'readable': '65ch'
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [],
} 