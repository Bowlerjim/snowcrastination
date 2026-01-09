export class Cabin {
  x: number
  y: number
  width = 60
  height = 70
  smokeParticles: Array<{
    x: number
    y: number
    vy: number
    life: number
  }> = []

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  update(snowPilePercent: number) {
    // Update smoke particles
    for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
      const particle = this.smokeParticles[i]
      if (!particle) continue
      particle.y += particle.vy
      particle.vy *= 0.98
      particle.life -= 0.02

      if (particle.life <= 0) {
        this.smokeParticles.splice(i, 1)
      }
    }

    // Spawn new smoke particles based on pile height
    const smokeIntensity = Math.max(0, 1 - snowPilePercent)
    if (Math.random() < smokeIntensity * 0.3) {
      this.smokeParticles.push({
        x: this.x + (Math.random() - 0.5) * 10,
        y: this.y - 40,
        vy: -(Math.random() * 0.5 + 0.5),
        life: 1,
      })
    }
  }

  render(ctx: CanvasRenderingContext2D, snowPilePercent: number) {
    // Calculate brightness based on snow pile
    const brightness = Math.max(0.3, 1 - snowPilePercent * 0.7)
    const lightIntensity = Math.max(0.2, 1 - snowPilePercent)

    // Draw cabin body
    ctx.fillStyle = `rgb(${139 * brightness}, ${69 * brightness}, ${19 * brightness})`
    ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height)

    // Draw roof
    ctx.fillStyle = `rgb(${180 * brightness}, ${50 * brightness}, ${30 * brightness})`
    ctx.beginPath()
    ctx.moveTo(this.x - this.width / 2 - 5, this.y)
    ctx.lineTo(this.x, this.y - 30)
    ctx.lineTo(this.x + this.width / 2 + 5, this.y)
    ctx.fill()

    // Draw windows with glow based on pile height
    const windowGlow = 255 * lightIntensity
    ctx.fillStyle = `rgb(${255 * lightIntensity}, ${200 * lightIntensity}, ${100 * lightIntensity})`

    // Left window
    ctx.fillRect(this.x - 25, this.y + 15, 15, 15)
    // Right window
    ctx.fillRect(this.x + 10, this.y + 15, 15, 15)

    // Window glow effect
    if (lightIntensity > 0.3) {
      ctx.shadowColor = `rgba(${windowGlow}, ${200 * lightIntensity}, ${100 * lightIntensity}, 0.5)`
      ctx.shadowBlur = 10
      ctx.strokeStyle = `rgba(255, 200, 100, ${lightIntensity})`
      ctx.lineWidth = 2
      ctx.strokeRect(this.x - 25, this.y + 15, 15, 15)
      ctx.strokeRect(this.x + 10, this.y + 15, 15, 15)
      ctx.shadowColor = 'transparent'
    }

    // Draw door
    ctx.fillStyle = `rgb(${80 * brightness}, ${40 * brightness}, ${20 * brightness})`
    ctx.fillRect(this.x - 8, this.y + 35, 16, 30)

    // Draw chimney
    ctx.fillStyle = `rgb(${100 * brightness}, ${100 * brightness}, ${100 * brightness})`
    ctx.fillRect(this.x + 20, this.y - 35, 12, 35)

    // Draw smoke
    ctx.globalAlpha = 0.6
    ctx.fillStyle = `rgba(200, 200, 200, ${lightIntensity * 0.8})`
    for (const particle of this.smokeParticles) {
      if (!particle) continue
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, 5 * particle.life, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }
}
