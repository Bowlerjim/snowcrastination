// Manages loading and caching of game entity images

export class ImageManager {
  private static imageCache = new Map<string, HTMLImageElement>()
  private static loadingPromises = new Map<string, Promise<HTMLImageElement>>()

  static async loadImage(url: string): Promise<HTMLImageElement> {
    // Return from cache if already loaded
    if (this.imageCache.has(url)) {
      return this.imageCache.get(url)!
    }

    // Return existing loading promise if in progress
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!
    }

    // Create new loading promise
    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'

      img.onload = () => {
        this.imageCache.set(url, img)
        this.loadingPromises.delete(url)
        resolve(img)
      }

      img.onerror = () => {
        this.loadingPromises.delete(url)
        reject(new Error(`Failed to load image: ${url}`))
      }

      img.src = url
    })

    this.loadingPromises.set(url, loadPromise)
    return loadPromise
  }

  static getImageSync(url: string): HTMLImageElement | null {
    return this.imageCache.get(url) || null
  }

  static clearCache(): void {
    this.imageCache.clear()
    this.loadingPromises.clear()
  }

  // Helper to load all game entity images
  static async loadGameAssets(cabinUrl?: string, snowflakeUrl?: string, snowballUrl?: string): Promise<void> {
    const promises = []

    if (cabinUrl) promises.push(this.loadImage(cabinUrl))
    if (snowflakeUrl) promises.push(this.loadImage(snowflakeUrl))
    if (snowballUrl) promises.push(this.loadImage(snowballUrl))

    await Promise.all(promises)
  }
}
