import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Cache for generated images to avoid re-generating
const imageCache = new Map<string, string>()

const PROMPTS = {
  cabin: 'A cozy, charming snow-covered wooden cabin with warm glowing windows, chimney with smoke, surrounded by snow drifts, high quality illustration, detailed, inviting, winter aesthetic, transparent background',
  snowflake: 'A beautiful, intricate ice crystal snowflake, sparkly, white and light blue, detailed geometric pattern, single snowflake, transparent background, winter, magical',
  snowball: 'A perfectly round snowball, white and slightly textured, with small ice sparkles, 3D rendered, winter, clean white background'
}

export async function POST(request: NextRequest) {
  try {
    const { imageType } = await request.json() as { imageType?: string }

    if (!imageType || !(['cabin', 'snowflake', 'snowball'].includes(imageType))) {
      return NextResponse.json(
        { error: 'Invalid or missing imageType. Must be one of: cabin, snowflake, snowball' },
        { status: 400 }
      )
    }

    // Check cache first
    if (imageCache.has(imageType)) {
      return NextResponse.json({
        success: true,
        imageType,
        cached: true,
        dataUrl: imageCache.get(imageType)
      })
    }

    // Get API key from environment
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_GENERATIVE_AI_KEY environment variable not configured' },
        { status: 500 }
      )
    }

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Note: Google's Generative AI SDK doesn't directly support image generation
    // You'll need to use Vertex AI's Imagen API or another service
    // For now, returning a placeholder response

    return NextResponse.json(
      {
        error: 'Image generation via Google Generative AI SDK requires Vertex AI setup. Please provide generated images directly or configure Vertex AI for Imagen.'
      },
      { status: 501 }
    )
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}
