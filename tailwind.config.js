/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //Light Theme Colors
        primary: '#d0f4d4',
        secondary: '#a8e4a5',

        //Dark Theme Colors
        'dark-primary': '#1e1e1e',
        'dark-secondary': '#2a2a2a',
        'dark-accent': '#333333',
        'dark-text': '#f5f5f5',
        'dark-background': '#121212'
      },
    },
  },
  variant: {
    extend: {
      backgroundColor: ['dark'],
      borderColor: ['dark'],
      textColor: ['dark'],
    }
  },  
  plugins: [],
};
