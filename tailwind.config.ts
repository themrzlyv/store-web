import type { Config } from "tailwindcss";
import { withTV } from "tailwind-variants/transformer";

export default withTV({
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      colors: {
        primary: {
          "50": "#EBF0FB",
          "100": "#D7E1F7",
          "200": "#AFC2EF",
          "300": "#88A4E6",
          "400": "#6085DE",
          "500": "#3867D6",
          "600": "#2D52AB",
          "700": "#223E80",
          "800": "#162956",
          "900": "#0B152B",
          "950": "#060A15",
          default: "#3867D6",
        },
        secondary: {
          default: "#F97315",
        },
        dark: {
          lighter: "#283248",
          light: "#151D2E",
          default: "#0C121E",
          "light-gray": "#D9DBE1",
        },
        light: {
          default: "#FBFCFE",
          dark: "#F2F4FD",
          darker: "#E2E9F6",
          "dark-10": "#e6e6e6",
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}) satisfies Config;
