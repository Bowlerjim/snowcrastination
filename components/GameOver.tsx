'use client'

import { useState } from 'react'
import { theme } from '@/lib/theme'
import Leaderboard from './Leaderboard'

interface GameOverScreenProps {
  score: number
  onPlayAgain: () => void
}

export default function GameOverScreen({ score, onPlayAgain }: GameOverScreenProps) {
  const [playerName, setPlayerName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [leaderboardScores, setLeaderboardScores] = useState<Array<{ name: string; score: number }>>([])

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerName.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: playerName.substring(0, 10), score }),
      })

      if (response.ok) {
        setSubmitted(true)
        const leaderboardResponse = await fetch('/api/leaderboard')
        const data = await leaderboardResponse.json()
        setLeaderboardScores(data.scores)
      }
    } catch (error) {
      console.error('Failed to submit score:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full p-4 overflow-y-auto" style={{ background: `linear-gradient(to bottom right, ${theme.colors.bg.primary}, ${theme.colors.bg.secondary})` }}>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>

      <div className="glass-cyber-strong rounded-4xl p-8 md:p-12 max-w-md w-full text-center my-auto border-4 animate-slide-down" style={{ 
        borderColor: theme.colors.functional.danger,
        boxShadow: theme.effects.glowDanger 
      }}>
        {/* Game Over Title */}
        <h1 className="font-display text-5xl md:text-6xl font-black mb-2" style={{
          color: theme.colors.functional.danger,
          textShadow: theme.effects.glowDanger
        }}>Game Over</h1>
        <p className="mono-label text-cyan-300/70 mb-8">You've defended well</p>

        {/* Score Display - Large & Bold */}
        <div className="rounded-3xl p-8 md:p-10 mb-10 border-2" style={{ 
          background: `linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.1) 100%)`,
          borderColor: theme.colors.cyan.glow,
          boxShadow: `inset 0 0 20px rgba(6, 182, 212, 0.1), ${theme.effects.glowCyan}`
        }}>
          <div className="mono-label text-cyan-300/70 mb-3">Final Score</div>
          <p className="font-display text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text" style={{ filter: theme.effects.textGlowCyan }}>
            {Math.floor(score)}
          </p>
        </div>

        {!submitted ? (
          <>
            <p className="mb-6 text-sm md:text-base" style={{ color: theme.colors.neutral.lightBlue }}>Make it to the Hall of Fame!</p>
            <form onSubmit={handleSubmitScore} className="mb-8">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.substring(0, 10))}
                placeholder="Your name"
                maxLength={10}
                className="w-full px-5 py-4 rounded-2xl mb-4 font-semibold focus:outline-none transition-all text-base md:text-lg"
                style={{ 
                  background: `rgba(15, 23, 42, 0.9)`,
                  color: theme.colors.neutral.ice,
                  border: `2px solid ${theme.colors.cyan.glow}`,
                  boxShadow: `inset 0 2px 8px rgba(0, 0, 0, 0.3)`
                }}
                disabled={isSubmitting}
                autoFocus
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.colors.cyan.glow}33, 0 0 20px ${theme.colors.cyan.glow}33`
                }}
              />
              <button
                type="submit"
                disabled={!playerName.trim() || isSubmitting}
                className="w-full px-5 py-4 text-white font-bold rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg font-display"
                style={{ 
                  background: theme.gradients.buttonCyberPrimary,
                  opacity: !playerName.trim() || isSubmitting ? '0.5' : '1'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Score'}
              </button>
            </form>
          </>
        ) : (
          <div className="mb-10">
            <p className="text-lg md:text-xl mb-6 font-display font-bold" style={{ 
              color: theme.colors.cyan.bright,
              textShadow: theme.effects.textGlowCyan
            }}>✓ Score submitted!</p>
            <div className="rounded-3xl p-6 text-left max-h-48 overflow-y-auto mb-6 border-2" style={{ 
              background: `linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(14, 165, 233, 0.05) 100%)`,
              borderColor: theme.colors.cyan.glow,
              backdropFilter: 'blur(8px)'
            }}>
              <h3 className="font-display font-bold text-darkWood mb-4 text-lg" style={{ color: theme.colors.neutral.ice }}>Hall of Fame</h3>
              <ul className="space-y-3">
                {leaderboardScores.map((entry, idx) => (
                  <li key={idx} className="flex justify-between text-sm md:text-base" style={{ color: theme.colors.neutral.lightBlue }}>
                    <span><span className="font-bold" style={{ color: theme.colors.cyan.bright }}>{idx + 1}.</span> {entry.name}</span>
                    <span className="font-bold" style={{ color: theme.colors.gold.bright }}>{entry.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="w-full px-8 py-4 text-lg md:text-xl font-display font-bold text-white rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ 
            background: theme.gradients.buttonSuccess,
            boxShadow: `${theme.effects.glowCyan}22, 0 4px 16px rgba(0, 0, 0, 0.3)`
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}
