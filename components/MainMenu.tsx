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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    <div className="w-full h-screen overflow-y-auto relative bg-black" style={{ background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.tertiary} 25%, #0f3a5a 50%, ${theme.colors.bg.tertiary} 75%, ${theme.colors.bg.primary} 100%)` }}>
      <style>{`
        /* Animated Grid Background */
        @keyframes gridShift {
          0%, 100% { backgroundPosition: 0 0; }
          50% { backgroundPosition: 40px 40px; }
        }

        /* Entrance Animations */
        @keyframes heroEntry {
          from {
            opacity: 0;
            transform: translateY(-40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInStagger {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.4)); }
          50% { filter: drop-shadow(0 0 30px rgba(6, 182, 212, 0.6)); }
        }

        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes buttonGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.4), 0 0 60px rgba(245, 158, 11, 0.2); }
          50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.6), 0 0 80px rgba(245, 158, 11, 0.3); }
        }

        /* Utility Classes */
        .hero-entry { animation: heroEntry 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .fade-stagger { animation: fadeInStagger 0.7s ease-out forwards; }
        .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .slide-right { animation: slideInFromRight 0.8s ease-out forwards; }
        .button-glow { animation: buttonGlow 2s ease-in-out infinite; }

        /* Stagger delays */
        .delay-0 { animation-delay: 0ms; }
        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 200ms; }
        .delay-3 { animation-delay: 300ms; }
        .delay-4 { animation-delay: 400ms; }

        /* Hover Effects */
        .button-premium {
          position: relative;
          overflow: hidden;
        }

        .button-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .button-premium:hover::before {
          left: 100%;
        }

        /* Accent Line */
        .accent-line {
          position: relative;
          display: inline-block;
        }

        .accent-line::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, ${theme.colors.cyan.glow}, transparent);
          border-radius: 2px;
        }
      `}</style>

      {/* Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.3) 25%, rgba(6, 182, 212, 0.3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.3) 75%, rgba(6, 182, 212, 0.3) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.3) 25%, rgba(6, 182, 212, 0.3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.3) 75%, rgba(6, 182, 212, 0.3) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Bar */}
        <div className="border-b border-cyan-500/20 backdrop-blur-md bg-black/30 px-4 md:px-8 py-4 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-black" style={{ color: theme.colors.cyan.glow }}>❄️</span>
              <h1 className="text-xl md:text-2xl font-black hidden sm:block" style={{ color: theme.colors.neutral.ice }}>SNOWCRASTINATION</h1>
            </div>
            <div className="text-xs md:text-sm tracking-wider uppercase font-bold" style={{ color: theme.colors.cyan.dim }}>
              v1.0 — Defense Protocol Active
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-12">
          {/* Large Title */}
          <div className={`text-center mb-8 md:mb-12 ${mounted ? 'hero-entry' : 'opacity-0'}`}>
            <h1
              className="text-7xl md:text-9xl font-black mb-4 leading-none"
              style={{
                backgroundImage: theme.gradients.titleText,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              DEFEND
            </h1>
            <h2
              className="text-5xl md:text-7xl font-black leading-none"
              style={{ color: theme.colors.cyan.bright }}
            >
              Your Winter
            </h2>
          </div>

          {/* Subtitle & Description */}
          <div className={`text-center max-w-lg mb-10 md:mb-14 ${mounted ? 'fade-stagger delay-1' : 'opacity-0'}`}>
            <p className="text-lg md:text-xl font-light tracking-wide mb-3" style={{ color: theme.colors.neutral.lightBlue }}>
              A tower defense arcade experience
            </p>
            <p className="text-sm md:text-base uppercase tracking-widest font-bold" style={{ color: theme.colors.cyan.dim }}>
              Blizzard incoming • Towers ready • Let's go
            </p>
          </div>

          {/* Game Stats Cards */}
          {!loading && (
            <div className={`grid grid-cols-3 gap-3 md:gap-4 mb-12 md:mb-16 max-w-2xl w-full ${mounted ? 'fade-stagger delay-2' : 'opacity-0'}`}>
              {/* Score Stats */}
              <div
                className="rounded-xl p-4 md:p-6 text-center border backdrop-blur-sm"
                style={{
                  borderColor: theme.colors.cyan.glow,
                  background: `rgba(6, 182, 212, 0.05)`,
                  boxShadow: `inset 0 1px 2px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.1)`
                }}
              >
                <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: theme.colors.cyan.bright }}>∞</div>
                <div className="text-xs uppercase font-bold tracking-wide" style={{ color: theme.colors.cyan.dim }}>Waves</div>
              </div>

              <div
                className="rounded-xl p-4 md:p-6 text-center border backdrop-blur-sm"
                style={{
                  borderColor: theme.colors.gold.primary,
                  background: `rgba(245, 158, 11, 0.05)`,
                  boxShadow: `inset 0 1px 2px rgba(245, 158, 11, 0.1), 0 0 20px rgba(245, 158, 11, 0.1)`
                }}
              >
                <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: theme.colors.gold.bright }}>⚡</div>
                <div className="text-xs uppercase font-bold tracking-wide" style={{ color: theme.colors.gold.glow }}>Power</div>
              </div>

              <div
                className="rounded-xl p-4 md:p-6 text-center border backdrop-blur-sm"
                style={{
                  borderColor: theme.colors.cyan.electric,
                  background: `rgba(14, 165, 233, 0.05)`,
                  boxShadow: `inset 0 1px 2px rgba(14, 165, 233, 0.1), 0 0 20px rgba(14, 165, 233, 0.1)`
                }}
              >
                <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: theme.colors.cyan.electric }}>🎯</div>
                <div className="text-xs uppercase font-bold tracking-wide" style={{ color: theme.colors.cyan.dim }}>Survival</div>
              </div>
            </div>
          )}

          {/* Weather Message */}
          {loading ? (
            <div className={`text-sm font-light tracking-wide ${mounted ? 'fade-stagger delay-3' : 'opacity-0'}`} style={{ color: theme.colors.cyan.bright }}>
              ⟳ Analyzing conditions...
            </div>
          ) : weatherMessage && (
            <div
              className={`rounded-xl p-6 md:p-8 mb-10 md:mb-14 border max-w-md w-full backdrop-blur-sm ${mounted ? 'fade-stagger delay-3' : 'opacity-0'}`}
              style={{
                borderColor: theme.colors.cyan.glow,
                background: `rgba(6, 182, 212, 0.08)`,
                boxShadow: `0 0 30px rgba(6, 182, 212, 0.2), inset 0 1px 2px rgba(6, 182, 212, 0.1)`
              }}
            >
              <p className="text-base md:text-lg font-semibold text-center" style={{ color: theme.colors.neutral.ice }}>
                {weatherMessage}
              </p>
            </div>
          )}

          {/* Primary CTA Button */}
          <button
            onClick={onStart}
            className={`px-10 md:px-16 py-5 md:py-7 text-2xl md:text-3xl font-display font-black text-white rounded-xl transform transition-all duration-300 hover:scale-110 active:scale-95 button-premium button-glow mb-8 md:mb-12 ${mounted ? 'fade-stagger delay-4' : 'opacity-0'}`}
            style={{
              background: theme.gradients.buttonPrimary,
              letterSpacing: '0.05em'
            }}
          >
            ▶ START GAME
          </button>
        </div>

        {/* Leaderboard Section */}
        <div className="px-4 md:px-8 py-12 md:py-16 border-t border-cyan-500/20">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="mb-8 md:mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.cyan.glow}, ${theme.colors.cyan.bright})`,
                    boxShadow: `0 0 20px rgba(6, 182, 212, 0.4)`
                  }}
                >
                  🏆
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black" style={{ color: theme.colors.neutral.ice }}>HALL OF FAME</h2>
                  <p className="text-xs md:text-sm uppercase tracking-widest font-bold mt-1" style={{ color: theme.colors.cyan.dim }}>Top defenders of all time</p>
                </div>
              </div>
            </div>

            {/* Leaderboard Card */}
            <div
              className="rounded-2xl p-8 md:p-10 border backdrop-blur-sm"
              style={{
                borderColor: theme.colors.cyan.glow,
                background: `linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(10, 22, 40, 0.9) 100%)`,
                boxShadow: `0 0 30px rgba(6, 182, 212, 0.1), inset 0 1px 2px rgba(6, 182, 212, 0.1)`
              }}
            >
              <Leaderboard />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-8 py-6 md:py-8 border-t border-cyan-500/20 bg-black/40 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-widest font-bold" style={{ color: theme.colors.cyan.dim }}>
              Built with ❄️ for tower defense fans
            </p>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-sm md:text-base font-bold text-white rounded-lg transform transition-all duration-200 hover:scale-105 active:scale-95 button-premium"
              style={{
                background: theme.gradients.buttonSecondary,
                boxShadow: theme.effects.glowCyan
              }}
            >
              ☕ Support Development
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
