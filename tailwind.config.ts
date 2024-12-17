import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({});
      addUtilities({});
    }),
  ],
  theme: {
    extend: {
      screens: {
        xs: "460px",
        xxl: "1920px",
      },
      colors: {
        background: "#0b0d14",
        cardBackground: "#12141e",
        primaryAccent: "#7970ea",
        secondaryAccent: "#579cf0",
        borderColor: "#1f2236",

        // background: "",
        // cardBackground: "",
        // primaryAccent: "",
        // secondaryAccent: "",
        // borderColor: "",

        textPrimary: "#fffffff2",
        textSecondary: "#b5b7da",
        caption: "#ced0eb",
        success: "#31dbb1",
        error: "#fc4a71",
        warning: "#ffdc30",
        offWhite: "#eeeeee",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        sora: ["var(--font-sora)"],
      },
    },
  },
};
export default config;
