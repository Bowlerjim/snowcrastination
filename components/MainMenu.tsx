'use client'

import { useEffect, useState } from 'react'
import Leaderboard from './Leaderboard'

interface MainMenuProps {
  onStart: () => void
}

export default function MainMenu({ onStart }: MainMenuProps) {
  const [weatherMessage, setWeatherMessage] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch weather message
    const fetchWeather = async () => {
      try {
        const position = await new Promise<GeolocationCoordinates>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            () => reject('Location denied')
          )
        })

        const response = await fetch(
          `/api/weather?lat=${position.latitude}&lon=${position.longitude}`
        )
        const data = await response.json()
        setWeatherMessage(data.message || '')
      } catch (error) {
        setWeatherMessage('❄️ Let\'s defend against the snow!')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  return (
    <div className="flex flex-col items-center justify-between w-full h-full overflow-y-auto" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1a2a4a 25%, #0f3a5a 50%, #1a2a4a 75%, #0f172a 100%)'
    }}>
      {/* Animated background snowflakes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 text-white text-8xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 15}%`,
              animation: `float ${8 + i * 2}s infinite ease-in-out`
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(180deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { text-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
      `}</style>

      <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 px-4 md:px-8">
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-4">
            <span className="text-6xl md:text-8xl">❄️</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-3 text-white drop-shadow-2xl" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Snowcrastination
          </h1>
          <p className="text-lg md:text-2xl text-blue-200 font-light tracking-wide mb-6">
            Defend your cozy cabin from the blizzard
          </p>

          {/* Weather Message Card */}
          {loading ? (
            <div className="text-blue-300 text-sm">Loading weather...</div>
          ) : weatherMessage && (
            <div className="bg-gradient-to-r from-blue-600/40 to-cyan-600/40 rounded-xl p-4 md:p-6 mb-8 border-2 border-blue-400/50 backdrop-blur-sm">
              <p className="text-lg md:text-2xl text-white font-semibold">{weatherMessage}</p>
            </div>
          )}
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="relative px-10 md:px-12 py-4 md:py-5 mb-10 md:mb-12 text-2xl md:text-3xl font-bold text-white rounded-xl shadow-2xl transform transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%)'
          }}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          <span className="relative flex items-center justify-center gap-2">
            🎮 START GAME
          </span>
        </button>

        {/* Leaderboard Section */}
        <div className="w-full max-w-md mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 text-center flex items-center justify-center gap-2">
            <span>🏆</span>
            <span>Top Players</span>
            <span>🏆</span>
          </h2>
          <div className="bg-gradient-to-b from-slate-700/60 to-slate-900/60 rounded-2xl p-6 md:p-8 border-2 border-slate-500/30 backdrop-blur-md shadow-2xl">
            <Leaderboard />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center py-6 md:py-8 px-4 md:px-8 border-t border-slate-700/50 relative z-10">
        <a
          href="https://buymeacoffee.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 md:px-10 py-3 md:py-4 text-lg md:text-xl font-bold text-white rounded-xl shadow-lg transform transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
          }}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          <span className="relative">☕ Support Development</span>
        </a>
      </div>
    </div>
  )
}
