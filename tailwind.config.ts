// tailwind.config.ts
import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config: Config = {
  // ... your existing config
  theme: {
    extend: {
      // You can add custom animations or spacing here
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
      })
    }),
  ],
}

export default config
