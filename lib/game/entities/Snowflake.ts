export type SnowflakeSize = 'small' | 'medium' | 'large'

export class Snowflake {
  x: number
  y: number
  vx = 0
  vy = 0.5
  size: number
  radius: number
  sizeType: SnowflakeSize

  constructor(x: number, y: number, sizeType: SnowflakeSize = 'small') {
    this.x = x
    this.y = y
    this.sizeType = sizeType

    switch (sizeType) {
      case 'large':
        this.size = 3
        this.radius = 5
        this.vy = 0.3
        break
      case 'medium':
        this.size = 2
        this.radius = 3
        this.vy = 0.4
        break
      case 'small':
      default:
        this.size = 1
        this.radius = 2
        this.vy = 0.5
    }

    // Add slight random horizontal drift
    this.vx = (Math.random() - 0.5) * 0.2
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy *= 1.01 // Accelerate slightly (gravity)
  }

  render(ctx: CanvasRenderingContext2D) {
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
