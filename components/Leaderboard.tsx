'use client'

import { useEffect, useState } from 'react'

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
    return <div className="text-gray-400 text-center py-4">Loading leaderboard...</div>
  }

  if (error) {
    return <div className="text-red-400 text-center py-4">{error}</div>
  }

  if (scores.length === 0) {
    return <div className="text-gray-400 text-center py-4">No scores yet. Be the first!</div>
  }

  return (
    <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4 border border-slate-600">
      <div className="space-y-2">
        {scores.slice(0, 10).map((entry, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-2 rounded hover:bg-slate-600 hover:bg-opacity-30 transition"
          >
            <div className="flex items-center gap-3">
              <div className="text-lg font-bold text-gray-400 w-6">{idx + 1}</div>
              <div className="text-white font-semibold truncate">{entry.name}</div>
            </div>
            <div className="text-lg font-bold text-orange-400">{entry.score}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
