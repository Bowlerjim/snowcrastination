// Cyberpunk Winter UI Theme
// Dark blue backgrounds + electric cyan + warm gold accents

export const theme = {
  colors: {
    // Dark backgrounds matching game canvas
    bg: {
      primary: '#0f172a',        // Deep space blue
      secondary: '#1e3a5f',      // Canvas midnight blue
      tertiary: '#1a2a4a',       // Mid-tone blue
      glassDark: '#0a1628',      // Ultra-dark for glass
    },

    // Electric cyan - primary accent (70%)
    cyan: {
      glow: '#06b6d4',           // Main cyan neon
      bright: '#22d3ee',         // Bright highlights
      electric: '#0ea5e9',       // Interactive states
      dim: '#0891b2',            // Subtle accents
      soft: '#67e8f9',           // Softer glow
    },

    // Warm gold - secondary accent (30%)
    gold: {
      primary: '#f59e0b',        // Main gold
      bright: '#fbbf24',         // Bright highlights
      rich: '#d97706',           // Darker active state
      glow: '#fcd34d',           // Glow effect
    },

    // Functional colors
    functional: {
      success: '#10b981',
      successHover: '#059669',
      danger: '#ef4444',
      dangerDim: '#dc2626',
    },

    // Neutral/text colors
    neutral: {
      white: '#ffffff',
      ice: '#e0f2fe',            // Icy white-blue
      lightBlue: '#bfdbfe',
      mediumBlue: '#93c5fd',
      gray: '#94a3b8',
      darkGray: '#64748b',
    },
  },

  effects: {
    // Glow effects - varying intensities
    glowCyan: '0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)',
    glowCyanStrong: '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(34, 211, 238, 0.4)',
    glowGold: '0 0 20px rgba(251, 191, 36, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)',
    glowGoldStrong: '0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(245, 158, 11, 0.4)',
    glowDanger: '0 0 30px rgba(239, 68, 68, 0.4), 0 0 60px rgba(239, 68, 68, 0.2)',

    // Text glows
    textGlowCyan: '0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.5)',
    textGlowGold: '0 0 10px rgba(245, 158, 11, 0.8), 0 0 20px rgba(245, 158, 11, 0.5)',

    // Glass morphism backgrounds
    glassCyber: 'linear-gradient(135deg, rgba(10, 22, 40, 0.85) 0%, rgba(15, 23, 42, 0.9) 100%)',
    glassCyberStrong: 'linear-gradient(135deg, rgba(10, 22, 40, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
  },

  gradients: {
    // Button gradients
    buttonPrimary: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
    buttonSecondary: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    buttonSuccess: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    buttonCyberPrimary: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 50%, #f59e0b 100%)',

    // Text gradients
    scoreText: 'linear-gradient(to right, #22d3ee, #67e8f9, #fbbf24)',
    titleText: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',

    // Progress bar
    progressSafe: 'linear-gradient(to right, #06b6d4, #22d3ee)',
    progressWarning: 'linear-gradient(to right, #22d3ee, #fbbf24, #f59e0b)',
    progressDanger: 'linear-gradient(to right, #f59e0b, #fb923c, #ef4444)',
  },
}

export type Theme = typeof theme
