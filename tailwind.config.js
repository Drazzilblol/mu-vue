/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(19, 20, 22)",
        "background-secondary": "rgb(24, 25, 27)",
        accent: "rgb(37, 39, 44)",
        primary: "rgb(60, 131, 246)",
        border: "rgb(100, 100, 100)",
        link: "rgb(147 197 253)",
        "pale-link": "rgb(191 219 254)",
        foreground: "rgb(230, 230, 230)",
        muted: "rgb(55 65 81)",
      },
    },
  },
  plugins: [],
};
