'use client'

import { useState, useEffect } from 'react'
import GameCanvas from '@/components/GameCanvas'
import MainMenu from '@/components/MainMenu'

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    // Prevent scrolling and zoom on mobile
    const preventZoom = (e: Event) => {
      const touchEvent = e as TouchEvent
      if (touchEvent.touches.length > 1) {
        e.preventDefault()
      }
    }

    const preventDefault = (e: Event) => {
      e.preventDefault()
    }

    document.addEventListener('touchmove', preventZoom, { passive: false })
    document.addEventListener('wheel', preventDefault, { passive: false })

    return () => {
      document.removeEventListener('touchmove', preventZoom)
      document.removeEventListener('wheel', preventDefault)
    }
  }, [])

  return (
    <div className="w-screen h-screen bg-slate-900 overflow-hidden">
      {!gameStarted ? (
        <MainMenu onStart={() => setGameStarted(true)} />
      ) : (
        <GameCanvas onGameOver={() => setGameStarted(false)} />
      )}
    </div>
  )
}
