import { ImageManager } from '../ImageManager'

export class Snowball {
  x: number
  y: number
  vx: number
  vy: number
  radius = 4
  speed = 8
  trail: Array<{ x: number; y: number }> = []
  maxTrailLength = 5
  imageUrl?: string

  constructor(startX: number, startY: number, targetX: number, targetY: number, imageUrl?: string) {
    this.x = startX
    this.y = startY
    this.imageUrl = imageUrl

    // Calculate direction
    const dx = targetX - startX
    const dy = targetY - startY
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Normalize and apply speed
    this.vx = (dx / distance) * this.speed
    this.vy = (dy / distance) * this.speed
  }

  update() {
    // Add trail
    this.trail.push({ x: this.x, y: this.y })
    if (this.trail.length > this.maxTrailLength) {
      this.trail.shift()
    }

    this.x += this.vx
    this.y += this.vy
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw trail
    if (this.trail.length > 1) {
      ctx.strokeStyle = 'rgba(200, 200, 255, 0.3)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(this.trail[0].x, this.trail[0].y)
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y)
      }
      ctx.stroke()
    }

    // Try to render image first, fall back to canvas drawing
    if (this.imageUrl) {
      const image = ImageManager.getImageSync(this.imageUrl)
      if (image) {
        const diameter = this.radius * 2
        ctx.drawImage(image, this.x - this.radius, this.y - this.radius, diameter, diameter)
        return
      }
    }

    // Fallback: draw white circle
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()

    // Add slight shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.beginPath()
    ctx.arc(this.x + 1, this.y + 1, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}
