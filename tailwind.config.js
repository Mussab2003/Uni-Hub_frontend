/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm' : '640px',
        'md' : '768px',
        'lg' : '1024px',
        'xl' : '1280px',
      },
      colors: {
        //Light Theme Colors
        primary: "#d0f4d4",
        secondary: "#a8e4a5",
        
        dodgerBlue : '#1E90FF',
        darkBlack: '#0D0D0D',
        darkGrey: '#131313',
        lightGreen: '#d0f4d4',  // Your provided green color
        darkGreen: '#a8d1b0', 

        //Dark Theme Colors
        "dark-primary": "#1e1e1e",
        "dark-secondary": "#2C2C2C",
        "dark-accent": "#333333",
        "dark-text": "#E0E0E0",
        "dark-button-background": "#1A5BA7",
        "dark-button-background-hover": "#174F8E",
        "dark-background": "#0D0D0D",
      },
    },
  },
  variant: {
    extend: {
      backgroundColor: ["dark"],
      borderColor: ["dark"],
      textColor: ["dark"],
    },
  },
  plugins: [],
};
