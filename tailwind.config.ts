import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cabin: {
          warm: '#FFF8DC',
          cold: '#E0F2FE',
        },
      },
    },
  },
  plugins: [],
}
export default config
