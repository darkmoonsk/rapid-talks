import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      "h1-bold": [
        "36px",
        {
          lineHeight: "100%",
          fontWeight: "700",
        },
      ],
      "h2-bold": [
        "30px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "h3-bold": [
        "24px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "h4-bold": [
        "20px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "body-bold": [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "body-medium": [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "base-bold": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      "base-medium": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "base-light": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      "sm-bold": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      "sm-medium": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "subtle-md": [
        "12px",
        {
          lineHeight: "16px",
          fontWeight: "500",
        },
      ],
      "tiny-md": [
        "10px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "x-sm-bold": [
        "7px",
        {
          lineHeight: "9.318px",
          fontWeight: "600",
        },
      ],
    },
    extend: {
      colors: {
        "blue-1": "#93C6E7",
        "blue-2": "#AEE2FF",
        "blue-3": "#B9F3FC",
        "blue-4": "#0B60B0",
        "grey-1": "#737373",
        "grey-2": "#f0f0f0",
        "grey-3": "#8B8B8B",
        "red-1": "#FF5252",
        "purple-1": "#C6D4FF",
        "purple-2": "#4D426D",
        "green-1": "#13E0E0",
        "pink-1": "#FEDEFF",
      },
      backgroundImage: {
        "sticker": "url(/images/sticker-bg.png)", 
      },
    },
  },
  plugins: [],
};
export default config;
