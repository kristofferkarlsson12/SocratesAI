/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'warm-white': '#F9F6F1',
        'near-black': '#1A1A1A',
        'terracotta': '#B85C38',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'DM Sans', 'sans-serif'],
      },
      transitionDuration: {
        '1500': '1500ms',
      },
    },
  },
  plugins: [],
}
