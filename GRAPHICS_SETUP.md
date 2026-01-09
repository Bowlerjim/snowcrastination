# Graphics Setup Guide

This guide explains how to integrate custom AI-generated graphics into Snowcrastination.

## Using Custom Graphics

The game supports custom images for:
- Cabin
- Snowflakes
- Snowballs

### How It Works

1. **Image URLs**: Pass image URLs when initializing the game engine
2. **Caching**: Images are automatically cached for performance
3. **Fallback**: If an image fails to load, the game renders fallback geometric shapes
4. **Smoke Effects**: The cabin smoke particles render on top of both canvas drawings and images

### Setting Up Images

#### Option 1: Pre-Generated Images (Recommended for Google Gemini)

If you've generated images with Google Gemini 3 Pro:

1. Save the images to the `/public` folder:
   - `/public/cabin.png` - Cabin illustration
   - `/public/snowflake.png` - Snowflake design
   - `/public/snowball.png` - Snowball illustration

2. Update `/app/page.tsx` to reference them:
```typescript
const imageUrls = {
  cabin: '/cabin.png',
  snowflake: '/snowflake.png',
  snowball: '/snowball.png'
}
```

#### Option 2: Dynamic Image Generation via API

Set up an API endpoint to generate images on-demand:

1. Create `/app/api/images/route.ts`
2. Use your preferred image generation service
3. Return image URLs to the client

### Image Requirements

For best results, images should have:
- **Cabin**: Transparent or white background, 60x70 pixels for default size
- **Snowflake**: Transparent background, approximately 12x12 pixels (scales with size)
- **Snowball**: Transparent background, approximately 8x8 pixels (scales with size)

### API Reference

#### ImageManager

```typescript
import { ImageManager } from '@/lib/game/ImageManager'

// Load image
const image = await ImageManager.loadImage(url)

// Check if image is cached
const cached = ImageManager.getImageSync(url)

// Clear cache
ImageManager.clearCache()
```

#### GameEngine Constructor

```typescript
const gameEngine = new GameEngine(
  canvas,
  ctx,
  {
    cabin: '/cabin.png',
    snowflake: '/snowflake.png',
    snowball: '/snowball.png'
  }
)
```

## Google Gemini 3 Pro Integration

To use Google Gemini 3 Pro for image generation:

1. **Set Environment Variable**:
   ```bash
   GOOGLE_GENERATIVE_AI_KEY=your_api_key_here
   ```

2. **Generate Images** (locally or via API):
   ```typescript
   const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY)
   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

   // Use for text-to-image capabilities if available
   ```

3. **Upload to Server**:
   - Generate images locally using the API
   - Save to `/public` folder
   - Reference in game configuration

## Troubleshooting

- **Images not showing**: Check browser console for CORS errors
- **Fallback shapes showing**: Images may still be loading; check network tab
- **Performance issues**: Images are cached; clear cache if testing multiple iterations

## Example Prompts for Gemini

**Cabin:**
"A cozy, charming snow-covered wooden cabin with warm glowing windows, chimney with smoke, surrounded by snow drifts, high quality illustration, detailed, inviting, winter aesthetic, transparent background"

**Snowflake:**
"A beautiful, intricate ice crystal snowflake, sparkly, white and light blue, detailed geometric pattern, single snowflake, transparent background, winter, magical"

**Snowball:**
"A perfectly round snowball, white and slightly textured, with small ice sparkles, 3D rendered, winter, clean white background"
