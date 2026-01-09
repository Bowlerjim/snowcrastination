import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk color system
        cyber: {
          bg: {
            primary: '#0f172a',
            secondary: '#1e3a5f',
            tertiary: '#1a2a4a',
            glass: '#0a1628',
          },
          cyan: {
            DEFAULT: '#06b6d4',
            bright: '#22d3ee',
            electric: '#0ea5e9',
            dim: '#0891b2',
            soft: '#67e8f9',
          },
          gold: {
            DEFAULT: '#f59e0b',
            bright: '#fbbf24',
            rich: '#d97706',
            glow: '#fcd34d',
          },
        },
        cabin: {
          warm: '#FFF8DC',
          cold: '#E0F2FE',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)',
        'neon-cyan-strong': '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(34, 211, 238, 0.4)',
        'neon-gold': '0 0 20px rgba(251, 191, 36, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)',
        'neon-gold-strong': '0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(245, 158, 11, 0.4)',
        'neon-danger': '0 0 30px rgba(239, 68, 68, 0.4), 0 0 60px rgba(239, 68, 68, 0.2)',
      },
      animation: {
        'pulse-cyan': 'pulse-cyan 2s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-cyan': {
          '0%, 100%': { 
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.5), 0 0 30px rgba(6, 182, 212, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 25px rgba(34, 211, 238, 0.7), 0 0 50px rgba(34, 211, 238, 0.5)' 
          },
        },
        'pulse-gold': {
          '0%, 100%': { 
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.6), 0 0 30px rgba(245, 158, 11, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 25px rgba(251, 191, 36, 0.8), 0 0 50px rgba(251, 191, 36, 0.5)' 
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
