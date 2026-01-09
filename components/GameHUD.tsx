'use client'

import { theme } from '@/lib/theme'

interface GameHUDProps {
  score: number
  snowPilePercent: number
  isMuted: boolean
  onMuteToggle: () => void
}

export default function GameHUD({ score, snowPilePercent, isMuted, onMuteToggle }: GameHUDProps) {
  // Determine snow level gradient based on danger
  const getSnowGradient = () => {
    if (snowPilePercent < 0.5) return theme.gradients.progressSafe
    if (snowPilePercent < 0.75) return theme.gradients.progressWarning
    return theme.gradients.progressDanger
  }

  // Determine glow color based on danger
  const getSnowGlow = () => {
    if (snowPilePercent > 0.75) return theme.effects.glowDanger
    return theme.effects.glowCyan
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 md:p-8 flex justify-between items-start pointer-events-none" style={{ color: theme.colors.neutral.ice }}>
      {/* Score Card - Left Side */}
      <div className="glass-cyber rounded-3xl p-6 md:p-8 pointer-events-auto border-2" style={{ borderColor: theme.colors.cyan.glow, boxShadow: theme.effects.glowCyan }}>
        <div className="mono-label text-cyan-300/70 mb-2">Score</div>
        <div className="font-display text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text" style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.5))' }}>
          {Math.floor(score)}
        </div>
      </div>

      {/* Mute Button - Right Side */}
      <button
        onClick={onMuteToggle}
        className="glass-cyber rounded-3xl p-5 md:p-7 pointer-events-auto hover:neon-cyan-strong transition-all duration-200 text-3xl md:text-4xl border-2 transform hover:scale-110 active:scale-95"
        style={{ borderColor: theme.colors.cyan.glow, boxShadow: theme.effects.glowCyan }}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Snow Level Indicator - Bottom Left */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 glass-cyber-strong rounded-3xl p-6 md:p-8 pointer-events-auto max-w-sm border-2" style={{ borderColor: theme.colors.cyan.glow, boxShadow: theme.effects.glowCyan }}>
        <div className="mono-label text-cyan-300/70 mb-4">Snow Level</div>
        <div className="w-56 md:w-64 h-8 md:h-9 rounded-full overflow-hidden border-2 shadow-inner" style={{ background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(10, 22, 40, 0.9))', borderColor: theme.colors.cyan.glow }}>
          <div
            className="h-full transition-all duration-300 shadow-lg"
            style={{ 
              width: Math.floor(snowPilePercent * 100) + '%',
              background: getSnowGradient(),
              boxShadow: getSnowGlow()
            }}
          />
        </div>
        <div className="text-sm md:text-base mt-3 text-right font-semibold font-mono" style={{ color: snowPilePercent > 0.75 ? theme.colors.functional.danger : theme.colors.cyan.bright }}>
          {Math.floor(snowPilePercent * 100)}%
        </div>
      </div>
    </div>
  )
}
