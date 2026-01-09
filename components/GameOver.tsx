'use client'

import { useState } from 'react'
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
        // Fetch updated leaderboard
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
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <div className="bg-slate-800 bg-opacity-90 rounded-2xl p-8 max-w-md w-full text-center border-2 border-red-500">
        <h1 className="text-4xl font-bold text-white mb-6">Game Over</h1>

        <div className="bg-slate-700 rounded-lg p-6 mb-8">
          <p className="text-gray-300 text-sm mb-2">Final Score</p>
          <p className="text-5xl font-bold text-white">{Math.floor(score)}</p>
        </div>

        {!submitted ? (
          <>
            <p className="text-gray-300 mb-4">Great score! Make it to the leaderboard!</p>
            <form onSubmit={handleSubmitScore} className="mb-6">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.substring(0, 10))}
                placeholder="Your name (max 10 chars)"
                maxLength={10}
                className="w-full px-4 py-3 rounded-lg mb-4 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={!playerName.trim() || isSubmitting}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-transform hover:scale-105"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Score'}
              </button>
            </form>
          </>
        ) : (
          <div className="mb-8">
            <p className="text-green-400 font-bold mb-4">✓ Score submitted!</p>
            <div className="bg-slate-700 rounded-lg p-4 text-left max-h-48 overflow-y-auto">
              <h3 className="font-bold text-white mb-3">Leaderboard</h3>
              <ul className="space-y-2 text-sm">
                {leaderboardScores.map((entry, idx) => (
                  <li key={idx} className="flex justify-between text-gray-300">
                    <span>{idx + 1}. {entry.name}</span>
                    <span className="font-bold">{entry.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <button
          onClick={onPlayAgain}
          className="w-full px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg transition-transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  )
}
