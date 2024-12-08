/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-[#93c5fd]",
    "bg-[#86efac]",
    "bg-yellow-200",
    "bg-[#d8b4fe]",
    "bg-[#fecaca]",
    "bg-[#c7d2fe]",
    "bg-[#fbcfe8]",
    "bg-[#fdba74]",
    "bg-[#81e6d9]",
    "bg-[#e5e7eb]",
    "bg-[#67e8f9]",
    "bg-[#a3e635]",
    "bg-[#fbbf24]",
    "bg-[#d6b7a1]",
    "bg-[#7FFFD4]",
    "bg-[#5D8AA8]",
    "bg-[#FFD700]",
    "bg-[#FF6347]",
    "bg-[#FFA07A]",
    "bg-[#fef08a]",
    "bg-[#50C878]",
    "bg-gray"
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: { 
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
