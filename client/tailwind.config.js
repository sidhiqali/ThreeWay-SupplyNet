/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('./src/assets/bg-2.png')",
        main: "url('./src/assets/main-bg.png')",
      },
    },
  },
  plugins: [],
};
