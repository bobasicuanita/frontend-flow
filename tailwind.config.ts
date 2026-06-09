import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        nasalization: ["Nasalization", "sans-serif"],
        outfit: ["var(--font-outfit)", "system-ui"],
      },
      maxWidth: {
        '8xl': '90rem',
      },
    }
  },
  plugins: []
} satisfies Config;