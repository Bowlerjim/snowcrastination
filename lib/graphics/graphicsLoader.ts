// Utility to load graphics and manage URLs
import { ImageManager } from '../game/ImageManager'

export interface GameGraphics {
  cabin?: string
  snowflake?: string
  snowball?: string
}

/**
 * Load and preload game graphics
 * By default, looks for images in /public folder
 */
export async function loadGameGraphics(
  customPaths?: GameGraphics
): Promise<GameGraphics> {
  const graphics: GameGraphics = {
    cabin: customPaths?.cabin || '/cabin.png',
    snowflake: customPaths?.snowflake || '/snowflake.png',
    snowball: customPaths?.snowball || '/snowball.png'
  }

  // Preload images
  try {
    if (typeof window !== 'undefined') {
      const promises = []
      if (graphics.cabin) promises.push(ImageManager.loadImage(graphics.cabin))
      if (graphics.snowflake) promises.push(ImageManager.loadImage(graphics.snowflake))
      if (graphics.snowball) promises.push(ImageManager.loadImage(graphics.snowball))

      await Promise.allSettled(promises)
      // Log which images failed to load for debugging
      console.log('Game graphics loaded')
    }
  } catch (error) {
    console.warn('Some graphics failed to preload:', error)
    // Continue with fallback graphics
  }

  return graphics
}

/**
 * Check if graphics are available in public folder
 */
export async function checkGraphicsAvailability(): Promise<GameGraphics> {
  const graphics: GameGraphics = {}

  if (typeof window === 'undefined') return graphics

  const paths = ['/cabin.png', '/snowflake.png', '/snowball.png']

  for (const path of paths) {
    try {
      const response = await fetch(path, { method: 'HEAD' })
      if (response.ok) {
        if (path.includes('cabin')) graphics.cabin = path
        if (path.includes('snowflake')) graphics.snowflake = path
        if (path.includes('snowball')) graphics.snowball = path
      }
    } catch {
      // File doesn't exist or CORS issue
    }
  }

  return graphics
}
