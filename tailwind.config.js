/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        "textColor": "#0A0A0A",
        "textGray": "#717182",
        "bgGray": "#F3F3F5",
        "black": "#030213",
        "textRed": "#E7000B",
        "textBlue": "#193CB8",
        "textGreen": "#016630",
        "white": "#FFFFFF",
        "pink": "#AD46FF",
        "yellow": "#F0B100",
        "danger": "#9F0712",
        "bgDanger": "#FFC9C9",
        "bgGreen": "#B9F8CF",
        "premiumbg": "#FE9A00",
        "barbg": "#ECECF0",
        "payColor": "#00A63E",

        "active": "#155DFC",
        "bgActive": "#DBEAFE",
        "completed": "#00A63E",
        "bgCompleted": "#DCFCE7",
        "wallet": "#00A63E",
        "bgWallet": "#DCFCE7",
        "saved": "#9810FA",
        "bgSaved": "#F3E8FF",
        "jobs": "#9810FA",
        "bgJobs": "#F3E8FF",
        "unread": "#F54900",
        "bgUnread": "#FFEDD4",
        "pending": "#D08700",
        "bgPending": "#FEF9C2",
        "iconGreen": "#00C950",
        "yellowIcon": "#FDC700",

        "primary": "#2563EB",
        "secondary": "#64748B",
        "background": "#F8FAFC",
        "accent": "#22C55E",
        "error": "#EF4444",
      },


      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },


      keyframes: {
        heartbeat: {
          "0%, 100%": {
            transform: "scale(1)",
          },

          "50%": {
            transform: "scale(1.08)",
          },
        },
      },


      animation: {
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
      },


    },
  },


  plugins: [],
};