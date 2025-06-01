import type { Config } from "tailwindcss";

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
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
        content: "var(--content-color)",  
        "content-inbetween": "var(--content-inbetween-color)",  
        "content-invert": "var(--content-invert-color)",  
        inbetween: "var(--inbetween-color)",
        background: "var(--background-color)",
        "background-light": "var(--background-light-color)",
        "background-light-invert": "var(--background-light-invert-color)",
        "background-deep-light": "var(--background-deep-light-color)",
        "background-deep-light-invert": "var(--background-deep-light-invert-color)",
        foreground: "var(--background-invert-color)",
        underline: "grey-50"
      },
    },
  },
  plugins: [],
} satisfies Config;
