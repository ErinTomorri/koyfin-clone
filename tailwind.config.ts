import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          red: '#E63946',
          cream: '#F1FAEE',
          lightblue: '#A8DADC',
          blue: '#457B9D',
          darkblue: '#1D3557',
        }
      },
    },
  },
  plugins: [],
};
export default config;
