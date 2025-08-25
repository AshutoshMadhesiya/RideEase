/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dots: {
          "0%, 20%": { content: '"."' },        // 1 dot
          "40%, 60%": { content: '".."' },      // 2 dots
          "80%, 100%": { content: '"..."' },    // 3 dots
        },
      },
      animation: {
        dots: "dots 1.5s steps(1,end) infinite",
      },
    },
  },
  plugins: [],
};
