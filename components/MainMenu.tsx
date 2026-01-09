'use client'

import { useEffect, useState } from 'react'
import { theme } from '@/lib/theme'
import Leaderboard from './Leaderboard'

interface MainMenuProps {
  onStart: () => void
}

export default function MainMenu({ onStart }: MainMenuProps) {
  const [weatherMessage, setWeatherMessage] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    <div className="w-full h-full overflow-y-auto relative" style={{ background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.tertiary} 25%, #0f3a5a 50%, ${theme.colors.bg.tertiary} 75%, ${theme.colors.bg.primary} 100%)` }}>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        .animate-fade-down { animation: fadeInDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-slide-up { animation: slideInUp 0.8s ease-out forwards; }
        .animate-float { animation: subtle-float 6s ease-in-out infinite; }
      `}</style>

      {/* Decorative snowflake background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="absolute text-9xl font-display" style={{ left: `${10 + i * 30}%`, top: `${-10 + i * 40}%` }}>
            ❄️
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col min-h-full">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 pt-12 md:pt-20">
          {/* Snowflake Icon */}
          <div className="mb-8 md:mb-12 animate-float" style={{ animationDelay: '0s' }}>
            <span className="text-9xl md:text-10xl block">❄️</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-6xl md:text-8xl font-black mb-4 animate-fade-down text-center leading-tight" style={{ backgroundImage: theme.gradients.titleText, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Snowcrastination
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl font-light tracking-wide mb-8 md:mb-12 animate-fade-down text-center max-w-2xl" style={{ color: theme.colors.cyan.bright, animationDelay: '0.1s' }}>
            Defend your cozy cabin from the blizzard
          </p>

          {/* Weather Card */}
          {loading ? (
            <div style={{ color: theme.colors.cyan.bright }} className="text-sm mb-8">Loading weather...</div>
          ) : weatherMessage && (
            <div 
              className="rounded-2xl p-6 md:p-8 mb-10 md:mb-14 border-2 max-w-md w-full animate-slide-up glass-cyber"
              style={{ 
                animationDelay: '0.2s', 
                borderColor: theme.colors.cyan.glow,
                boxShadow: theme.effects.glowCyan
              }}
            >
              <p className="text-lg md:text-xl font-semibold text-center" style={{ color: theme.colors.neutral.ice }}>{weatherMessage}</p>
            </div>
          )}
        </div>

        {/* START GAME Button - PRIMARY ACTION */}
        <div className="px-4 md:px-8 pb-8 md:pb-12">
          <button
            onClick={onStart}
            className="w-full md:w-auto mx-auto block px-12 md:px-16 py-4 md:py-6 text-2xl md:text-3xl font-display font-bold text-white rounded-2xl transform transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group relative"
            style={{ 
              background: theme.gradients.buttonPrimary,
              boxShadow: theme.effects.glowGoldStrong
            }}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity" />
            <span className="relative flex items-center justify-center gap-3">🎮 START GAME</span>
          </button>
        </div>

        {/* Leaderboard Section */}
        <div className="px-4 md:px-8 pb-12 md:pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
              <div className="h-1 flex-1" style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.colors.cyan.glow})` }} />
              <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: theme.colors.neutral.ice }}>🏆 Hall of Fame</h2>
              <div className="h-1 flex-1" style={{ backgroundImage: `linear-gradient(to left, transparent, ${theme.colors.cyan.glow})` }} />
            </div>
            <div className="rounded-3xl p-8 md:p-10 glass-cyber-strong" style={{ borderColor: theme.colors.cyan.dim, boxShadow: theme.effects.glowCyan }}>
              <Leaderboard />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full text-center py-6 md:py-8 px-4 md:px-8 border-t bg-white/5 backdrop-blur-sm" style={{ borderTopColor: theme.colors.cyan.dim }}>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 md:px-10 py-3 md:py-4 text-lg md:text-xl font-bold text-white rounded-xl transform transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden group"
            style={{ 
              background: theme.gradients.buttonSecondary,
              boxShadow: theme.effects.glowCyan
            }}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative">☕ Support Development</span>
          </a>
        </div>
      </div>
    </div>
  )
}
