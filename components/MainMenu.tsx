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
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg">
          Snowcrastination
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-4">
          Defend your cabin from the falling snow
        </p>

        {weatherMessage && (
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 mb-6 border-2 border-blue-400">
            <p className="text-xl text-white">{weatherMessage}</p>
          </div>
        )}
      </div>

      <button
        onClick={onStart}
        className="px-8 py-4 mb-8 text-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
      >
        Start Game
      </button>

      <div className="w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">🏆 Top Players</h2>
        <Leaderboard />
      </div>

      <div className="mt-auto pt-8">
        <a
          href="https://buymeacoffee.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-lg shadow-md transform hover:scale-105 transition-transform"
        >
          ☕ Buy Me a Hot Chocolate
        </a>
      </div>
    </div>
  )
}
