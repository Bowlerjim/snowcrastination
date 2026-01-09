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
        setWeatherMessage('🌨️ Let\'s defend against the snow!')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  return (
    <div className="flex flex-col items-center justify-between w-full h-full bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 p-4 md:p-8 overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg">
            Snowcrastination
          </h1>
          <p className="text-base md:text-xl text-blue-100 mb-4">
            Defend your cabin from the falling snow
          </p>

          {loading ? (
            <div className="text-blue-200 text-sm">Loading weather...</div>
          ) : weatherMessage && (
            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-3 md:p-4 mb-6 border-2 border-blue-400">
              <p className="text-lg md:text-xl text-white">{weatherMessage}</p>
            </div>
          )}
        </div>

        <button
          onClick={onStart}
          className="px-6 md:px-8 py-3 md:py-4 mb-6 md:mb-8 text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform active:scale-95"
        >
          Start Game
        </button>

        <div className="w-full max-w-md mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 text-center">🏆 Top Players</h2>
          <Leaderboard />
        </div>
      </div>

      <div className="w-full text-center pt-4 md:pt-8 border-t border-slate-700">
        <a
          href="https://buymeacoffee.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 md:py-3 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-lg shadow-md transform hover:scale-105 transition-transform active:scale-95"
        >
          ☕ Buy Me a Hot Chocolate
        </a>
      </div>
    </div>
  )
}
