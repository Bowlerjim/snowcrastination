'use client'

import { useEffect, useRef, useState } from 'react'
import { GameEngine } from '@/lib/game/GameEngine'
import { loadGameGraphics } from '@/lib/graphics/graphicsLoader'
import GameHUD from './GameHUD'
import GameOverScreen from './GameOver'

interface GameCanvasProps {
  onGameOver: () => void
}

export default function GameCanvas({ onGameOver }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameEngineRef = useRef<GameEngine | null>(null)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [snowPilePercent, setSnowPilePercent] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Load graphics and initialize game engine
    let animationFrameId: number | undefined

    const initializeGame = async () => {
      const imageUrls = await loadGameGraphics()
      const gameEngine = new GameEngine(canvas, ctx, imageUrls)
      gameEngineRef.current = gameEngine

      // Handle game over
      const handleGameOver = () => {
        setIsGameOver(true)
        setScore(gameEngine.getScore())
      }

      gameEngine.onGameOver = handleGameOver

      // Game loop
      const gameLoop = () => {
        gameEngine.update()
        gameEngine.render()

        setScore(gameEngine.getScore())
        setSnowPilePercent(gameEngine.getSnowPilePercent())

        animationFrameId = requestAnimationFrame(gameLoop)
      }

      animationFrameId = requestAnimationFrame(gameLoop)
    }

    initializeGame()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
    if (gameEngineRef.current) {
      gameEngineRef.current.toggleAudio()
    }
  }

  if (isGameOver) {
    return <GameOverScreen score={score} onPlayAgain={() => {
      setIsGameOver(false)
      onGameOver()
    }} />
  }

  return (
    <div className="relative w-screen h-screen">
      <canvas
        ref={canvasRef}
        className="block w-full h-full touch-none"
        onContextMenu={(e) => e.preventDefault()}
      />
      <GameHUD
        score={score}
        snowPilePercent={snowPilePercent}
        isMuted={isMuted}
        onMuteToggle={handleMuteToggle}
      />
    </div>
  )
}
