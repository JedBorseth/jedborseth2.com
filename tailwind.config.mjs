/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        bg: "#daf5f0",
        main: "#c4a1ff",
        mainAccent: "#9e66ff", // not needed for shadcn
      },
      borderRadius: {
        base: "5px",
      },
      boxShadow: {
        base: "4px 4px 0px 0px rgba(0,0,0,1)",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "4px",
      },
      fontWeight: {
        base: "500",
        heading: "700",
      },
    },
  },
  plugins: [],
};
