import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        kaushan: ["Kaushan Script", "cursive"],
      },
      // keyframes: {
      //   bounce: {
      //     "0%, 100%": { transform: "translateY(0)" },
      //     "50%": { transform: "translateY(-10px)" },
      //   },
      //   spin: {
      //     "0%": { transform: "rotate(0deg)" },
      //     "100%": { transform: "rotate(360deg)" },
      //   },
      //   float: {
      //     "0%, 100%": { transform: "translateY(0)" },
      //     "50%": { transform: "translateY(-8px)" },
      //   },
      //   moveRight: {
      //     "0%, 100%": { transform: "translateX(0)" },
      //     "50%": { transform: "translateX(10px)" },
      //   },
      // },
      // animation: {
      //   bounce: "bounce 3s infinite",
      //   spin: "spin 4s linear infinite",
      //   "spin-slow": "spin 10s linear infinite",
      //   float: "float 5s ease-in-out infinite",
      //   "move-right": "moveRight 4s ease-in-out infinite",
      // },
    },
  },
  plugins: [],
};

export default config;
