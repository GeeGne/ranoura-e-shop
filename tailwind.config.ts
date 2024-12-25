import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        heading: "var(--font-heading-color)",
        'heading-invert': "var(--font-heading-invert-color)",
        body: "var(--font-body-color)",
        'body-invert': "var(--font-body-invert-color)",
        'body-light': "var(--font-light-color)",
        'body-light-invert': "var(--font-light-invert-color)",
        'body-extra-light': "var(--font-extra-light-color)",
        'body-extra-light-invert': "var(--font-extra-light-invert-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",  
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
