import { ImageManager } from '../ImageManager'

export type SnowflakeSize = 'small' | 'medium' | 'large'

export class Snowflake {
  x: number
  y: number
  vx = 0
  vy = 0.5
  size: number
  radius: number
  sizeType: SnowflakeSize
  imageUrl?: string

  constructor(x: number, y: number, sizeType: SnowflakeSize = 'small', imageUrl?: string) {
    this.x = x
    this.y = y
    this.sizeType = sizeType
    this.imageUrl = imageUrl

    switch (sizeType) {
      case 'large':
        this.size = 3
        this.radius = 35
        this.vy = 0.05
        break
      case 'medium':
        this.size = 2
        this.radius = 25
        this.vy = 0.08
        break
      case 'small':
      default:
        this.size = 1
        this.radius = 15
        this.vy = 0.1
    }

    // Add slight random horizontal drift
    this.vx = (Math.random() - 0.5) * 0.3
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy *= 1.01 // Accelerate slightly (gravity)
  }

  render(ctx: CanvasRenderingContext2D) {
    // Try to render image first, fall back to canvas drawing
    if (this.imageUrl) {
      const image = ImageManager.getImageSync(this.imageUrl)
      if (image) {
        const diameter = this.radius * 2
        ctx.drawImage(image, this.x - this.radius, this.y - this.radius, diameter, diameter)
        return
      }
    }

    // Fallback: draw simple white circle
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }

  getPoints(): number {
    switch (this.sizeType) {
      case 'large':
        return 30
      case 'medium':
        return 20
      case 'small':
      default:
        return 10
    }
  }
}
