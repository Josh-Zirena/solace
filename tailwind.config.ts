import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'solace': {
          'primary': '#1d4339',
          'primary-dark': '#0f2319',
          'primary-light': '#2a5a4d',
          'secondary': '#e0f2e7',
          'accent': '#f0fdfa',
          'emerald': '#10b981',
          'emerald-light': '#34d399',
          'emerald-dark': '#047857',
          'mint': '#6ee7b7',
          'sage': '#84cc16',
          'forest': '#166534',
          'pearl': '#fefefe',
          'cream': '#fffef7',
          'gray-light': '#f8fafc',
          'gray-medium': '#64748b',
          'gray-dark': '#334155',
        },
      },
      fontFamily: {
        'lato': ['var(--font-lato)', 'sans-serif'],
        'mollie-glaston': ['var(--font-mollie-glaston)', 'serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
