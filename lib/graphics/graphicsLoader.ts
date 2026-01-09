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
 * Tries PNG first (for AI-generated images), falls back to SVG
 */
export async function loadGameGraphics(
  customPaths?: GameGraphics
): Promise<GameGraphics> {
  const graphics: GameGraphics = {
    cabin: customPaths?.cabin || '/cabin.png',
    snowflake: customPaths?.snowflake || '/snowflake.png',
    snowball: customPaths?.snowball || '/snowball.png'
  }

  // If PNG files don't exist, try SVG alternatives
  if (typeof window !== 'undefined') {
    const availability = await checkGraphicsAvailability()
    if (availability.cabin) graphics.cabin = availability.cabin
    if (availability.snowflake) graphics.snowflake = availability.snowflake
    if (availability.snowball) graphics.snowball = availability.snowball
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
 * Tries PNG first (AI-generated), falls back to SVG
 */
export async function checkGraphicsAvailability(): Promise<GameGraphics> {
  const graphics: GameGraphics = {}

  if (typeof window === 'undefined') return graphics

  // Define the priority order: PNG first, then SVG
  const imagesByType = {
    cabin: ['/cabin.png', '/cabin.svg'],
    snowflake: ['/snowflake.png', '/snowflake.svg'],
    snowball: ['/snowball.png', '/snowball.svg']
  }

  for (const [type, paths] of Object.entries(imagesByType)) {
    for (const path of paths) {
      try {
        const response = await fetch(path, { method: 'HEAD' })
        if (response.ok) {
          graphics[type as keyof GameGraphics] = path
          break // Use first available format (PNG preferred)
        }
      } catch {
        // File doesn't exist or CORS issue, try next format
      }
    }
  }

  return graphics
}
