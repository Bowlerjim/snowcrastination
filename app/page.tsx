'use client'

import { useState } from 'react'
import GameCanvas from '@/components/GameCanvas'
import MainMenu from '@/components/MainMenu'

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)

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
