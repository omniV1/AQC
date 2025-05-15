/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        cream: '#FAF7F2',
        brown: {
          light: '#A27B5C',
          DEFAULT: '#6B4D37',
          dark: '#2C3639',
        },
        sage: {
          light: '#8C9A8C',
          DEFAULT: '#3F4E4F',
        },
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 