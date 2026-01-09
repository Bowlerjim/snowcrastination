import { Snowflake } from './entities/Snowflake'
import { Snowball } from './entities/Snowball'
import { Cabin } from './entities/Cabin'
import { checkCollision } from './collision'
import { AudioManager } from '../audio/AudioManager'

export class GameEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private snowflakes: Snowflake[] = []
  private snowballs: Snowball[] = []
  private cabin: Cabin
  private score = 0
  private snowPileHeight = 0
  private maxSnowPileHeight = 100
  private isGameOver = false
  private spawnTimer = 0
  private spawnInterval = 120 // frames between spawns
  private gameTime = 0
  private audioManager: AudioManager

  onGameOver?: () => void

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.ctx = ctx
    this.cabin = new Cabin(canvas.width / 2, canvas.height - 100)
    this.audioManager = new AudioManager()

    this.setupInput()
  }

  private setupInput() {
    // Mouse/Touch input
    const handlePointerDown = (e: PointerEvent) => {
      if (this.isGameOver) return

      const rect = this.canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      this.shootSnowball(x, y)
    }

    this.canvas.addEventListener('pointerdown', handlePointerDown)
  }

  private shootSnowball(targetX: number, targetY: number) {
    const snowball = new Snowball(
      this.cabin.x,
      this.cabin.y,
      targetX,
      targetY
    )
    this.snowballs.push(snowball)
    this.audioManager.playSoundEffect('throw')
  }

  update() {
    if (this.isGameOver) return

    this.gameTime++

    // Spawn snowflakes
    this.spawnTimer++
    const difficultyMultiplier = Math.min(1 + this.gameTime / 10000, 2)
    if (this.spawnTimer > this.spawnInterval / difficultyMultiplier) {
      this.spawnSnowflake()
      this.spawnTimer = 0
    }

    // Update snowflakes
    for (let i = this.snowflakes.length - 1; i >= 0; i--) {
      const snowflake = this.snowflakes[i]
      if (!snowflake) continue
      snowflake.update()

      // Check if hit ground
      if (snowflake.y >= this.canvas.height - 50) {
        this.snowPileHeight += snowflake.size
        this.snowflakes.splice(i, 1)
        this.audioManager.playSoundEffect('accumulate')
      }
    }

    // Update snowballs
    for (let i = this.snowballs.length - 1; i >= 0; i--) {
      const snowball = this.snowballs[i]
      if (!snowball) continue
      snowball.update()

      // Check if off-screen
      if (
        snowball.x < 0 ||
        snowball.x > this.canvas.width ||
        snowball.y < 0 ||
        snowball.y > this.canvas.height
      ) {
        this.snowballs.splice(i, 1)
        continue
      }

      // Check collisions with snowflakes
      for (let j = this.snowflakes.length - 1; j >= 0; j--) {
        const flake = this.snowflakes[j]
        if (!flake) continue
        if (checkCollision(snowball, flake)) {
          const points = flake.getPoints()
          this.score += points
          this.snowflakes.splice(j, 1)
          this.snowballs.splice(i, 1)
          this.audioManager.playSoundEffect('hit')
          break
        }
      }
    }

    // Update cabin
    this.cabin.update(this.getSnowPilePercent())

    // Check lose condition
    if (this.snowPileHeight >= this.maxSnowPileHeight) {
      this.isGameOver = true
      this.audioManager.playSoundEffect('gameOver')
      this.onGameOver?.()
    }

    // Update audio based on snow pile
    this.audioManager.setFireVolume(1 - this.snowPileHeight / this.maxSnowPileHeight)
  }

  render() {
    // Clear canvas
    this.ctx.fillStyle = '#1e3a5f'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Render background
    this.renderBackground()

    // Render snowflakes
    this.ctx.fillStyle = '#ffffff'
    for (const snowflake of this.snowflakes) {
      snowflake.render(this.ctx)
    }

    // Render snowballs
    for (const snowball of this.snowballs) {
      snowball.render(this.ctx)
    }

    // Render snow pile
    this.renderSnowPile()

    // Render cabin
    this.cabin.render(this.ctx, this.getSnowPilePercent())
  }

  private renderBackground() {
    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      0,
      this.canvas.height
    )

    const coldness = this.snowPileHeight / this.maxSnowPileHeight
    gradient.addColorStop(0, `rgb(${30 + coldness * 20}, ${58 - coldness * 30}, ${95 + coldness * 30})`)
    gradient.addColorStop(1, `rgb(${20 + coldness * 10}, ${40 - coldness * 20}, ${70 + coldness * 30})`)

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private renderSnowPile() {
    const pileHeight = (this.snowPileHeight / this.maxSnowPileHeight) * (this.canvas.height / 3)
    this.ctx.fillStyle = '#f8f8ff'
    this.ctx.fillRect(0, this.canvas.height - pileHeight, this.canvas.width, pileHeight)
  }

  private spawnSnowflake() {
    const x = Math.random() * this.canvas.width
    const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small'
    const snowflake = new Snowflake(x, -20, size as any)
    this.snowflakes.push(snowflake)
  }

  getScore(): number {
    return this.score
  }

  getSnowPilePercent(): number {
    return Math.min(this.snowPileHeight / this.maxSnowPileHeight, 1)
  }

  toggleAudio(): void {
    this.audioManager.toggleMute()
  }

  isMuted(): boolean {
    return this.audioManager.isMutedState()
  }
}
