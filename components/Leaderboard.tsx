'use client'

import { useEffect, useState } from 'react'
import { theme } from '@/lib/theme'

interface LeaderboardEntry {
  name: string
  score: number
}

export default function Leaderboard() {
  const [scores, setScores] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard')
        if (!response.ok) throw new Error('Failed to fetch leaderboard')
        const data = await response.json()
        setScores(data.scores || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return <div className="text-center py-6 text-sm md:text-base" style={{ color: theme.colors.cyan.bright }}>Loading champions...</div>
  }

  if (error) {
    return <div className="text-center py-6 text-sm md:text-base" style={{ color: theme.colors.functional.danger }}>{error}</div>
  }

  if (scores.length === 0) {
    return <div className="text-center py-8 text-base md:text-lg font-semibold" style={{ color: theme.colors.cyan.bright }}>Be the first to defend!</div>
  }

  return (
    <div className="space-y-3">
      {scores.slice(0, 10).map((entry, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center p-4 md:p-5 rounded-2xl hover:transition-all duration-200 border"
          style={{ 
            borderColor: theme.colors.cyan.dim,
            background: idx % 2 === 0 ? 'transparent' : `rgba(6, 182, 212, 0.05)`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `rgba(6, 182, 212, 0.15)`
            e.currentTarget.style.boxShadow = `0 0 10px rgba(6, 182, 212, 0.15)`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = idx % 2 === 0 ? 'transparent' : `rgba(6, 182, 212, 0.05)`
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="font-display font-black text-2xl md:text-3xl w-8 md:w-10 flex-shrink-0" style={{ 
              color: theme.colors.cyan.bright,
              textShadow: idx < 3 ? theme.effects.textGlowCyan : 'none'
            }}>
              {idx === 0 ? '👑' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
            </div>
            <div className="font-semibold truncate text-sm md:text-base" style={{ color: theme.colors.neutral.ice }}>{entry.name}</div>
          </div>
          <div className="text-xl md:text-2xl font-display font-black ml-4 flex-shrink-0 text-transparent bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text" style={{ filter: theme.effects.textGlowCyan }}>
            {entry.score}
          </div>
        </div>
      ))}
    </div>
  )
}
