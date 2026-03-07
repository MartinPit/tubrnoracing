// tailwind.config.ts
import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config: Config = {
  // ... your existing config
  theme: {
    extend: {
      keyframes: {
        "enterFromRight": {
          from: { opacity: 0, transform: "translateX(200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "enterFromLeft": {
          from: { opacity: 0, transform: "translateX(-200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        // ... ensure you have the standard shadcn animations here
      },
      animation: {
        "nav-enter": "enterFromRight 0.25s ease",
        "nav-exit": "exitToLeft 0.25s ease",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function({ addUtilities }) {
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
