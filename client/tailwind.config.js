/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        hero: "url('https://res.cloudinary.com/dxp8k3sze/image/upload/v1688914311/bg-2_dx06ns.png')",
        main: "url('https://res.cloudinary.com/dxp8k3sze/image/upload/v1688914314/main-bg_g8awxu.png')",
      }),
    },
  },
  plugins: [],
};
