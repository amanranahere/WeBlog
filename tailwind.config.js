/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        unicaOne: ["Unica One", "sans-serif"],
        SourceCodePro: ["Source Code Pro", "monospace"],
        Lato: ["Lato", "sans-serif"],
        SpaceGrotesk: ["Space Grotesk", "sans-serif"],
      },
      keyframes: {
        typewriter: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "black" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        typewriter:
          "typewriter 2s steps(40) 1s 1 normal both, blink 0.75s step-end infinite",
        typewriterWithoutBlink: "typewriter 2s steps(40) 1s 1 normal both",
        slideInRight: "slideInRight 1s ease-out forwards",
      },
      animationDelay: {
        "delay-100": "100ms",
        "delay-200": "200ms",
        "delay-300": "300ms",
        "delay-400": "400ms",
        "delay-3000": "3000ms",
        "delay-5000": "5000ms",
        "delay-6000": "6000ms",
        "delay-8000": "8000ms",
        "delay-10000": "10000ms",
        "delay-12000": "12000ms",
        "delay-13500": "13500ms",
      },
      backgroundImage: {
        "hero-pattern": "url('./src/assets/Beep Beep - Mountains.png')",
        "aquatic-nebula": "url('./src/assets/Aquatic Nebula.jpg')",
        "para3-home": "url('./src/assets/para3-home.jpg')",
        5484597: "url('./src/assets/5484597.jpg')",
        "Friendly-blobs": "url('./src/assets/Friendly Blobs.png')",
      },
    },
  },
  plugins: [
    // scroll-bar function
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
    // delay function
    function ({ addUtilities, theme }) {
      const delays = theme("animationDelay");
      const delayUtilities = Object.keys(delays).map((key) => {
        return {
          [`.${key}`]: {
            "animation-delay": delays[key],
          },
        };
      });
      addUtilities(delayUtilities, ["responsive", "hover"]);
    },
  ],
};
