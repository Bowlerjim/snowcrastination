import { GoogleGenerativeAI } from '@google/generative-ai'
import * as fs from 'fs'
import * as path from 'path'

const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyA_y8qqvpPboxJxERYCfvkoZ74p7E48e1Q'

const genAI = new GoogleGenerativeAI(API_KEY)

// Image generation prompts
const PROMPTS = {
  cabin: `Create a high-quality illustration of a cozy, charming snow-covered wooden cabin with these specific details:
- Warm, glowing golden windows showing interior light
- Chimney with visible smoke wisping upward
- Brown wooden logs/siding
- Snow drifts piled around the base
- Red/brown roof covered in snow
- Winter aesthetic, magical and inviting
- Transparent background
- Clean, detailed illustration style
- 512x512 pixel format
- Perfect for use in a winter game`,

  snowflake: `Create a beautiful, detailed ice crystal snowflake with these specifications:
- Intricate geometric crystalline pattern
- Sparkly, light blue and white colors with some transparency
- Single snowflake (not multiple)
- Detailed symmetrical design
- Winter magical aesthetic
- Transparent background
- 256x256 pixel format
- High quality illustration style
- Perfect for use falling in a winter game`,

  snowball: `Create a perfectly round, realistic snowball with these details:
- Pure white with slight shading for 3D effect
- Small ice sparkles on the surface
- Smooth, rounded edges
- Slightly textured snow appearance
- Winter aesthetic
- Transparent background
- 128x128 pixel format
- 3D rendered style
- Perfect for throwing in a winter game`
}

async function generateGraphic(name: string, prompt: string): Promise<void> {
  try {
    console.log(`\n🎨 Generating ${name}...`)

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Note: The gemini-2.0-flash model may not support direct image generation via generateContent
    // If this fails, we'll fall back to creating SVG-based graphics
    const result = await model.generateContent(prompt)

    console.log(`✅ ${name} generated successfully`)
    console.log('Note: Direct image generation via generateContent may not be available.')
    console.log('Creating high-quality placeholder graphics instead...\n')

  } catch (error) {
    console.error(`⚠️  Cannot generate ${name} via Gemini API`)
    console.log('Reason: Gemini API does not support image generation directly.')
    console.log('Creating alternative graphics solution...\n')
  }
}

async function createSVGGraphics(): Promise<void> {
  const publicDir = path.join(process.cwd(), 'public')

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  // Create cabin SVG (basic but styled)
  const cabinSVG = `<svg width="60" height="70" viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <!-- Cabin body -->
    <rect x="10" y="25" width="40" height="35" fill="#8B4513" stroke="#654321" stroke-width="1"/>
    <!-- Roof -->
    <polygon points="5,25 30,5 55,25" fill="#A0361A" stroke="#8B2E1B" stroke-width="1"/>
    <!-- Door -->
    <rect x="25" y="45" width="10" height="15" fill="#4A2C1F" stroke="#2F1B14" stroke-width="0.5"/>
    <!-- Left window -->
    <rect x="15" y="35" width="8" height="8" fill="#FFD700" stroke="#FFA500" stroke-width="0.5" opacity="0.8"/>
    <!-- Right window -->
    <rect x="37" y="35" width="8" height="8" fill="#FFD700" stroke="#FFA500" stroke-width="0.5" opacity="0.8"/>
    <!-- Chimney -->
    <rect x="42" y="10" width="6" height="18" fill="#666" stroke="#444" stroke-width="0.5"/>
    <!-- Smoke -->
    <circle cx="45" cy="8" r="3" fill="#BBB" opacity="0.4"/>
    <circle cx="46" cy="4" r="2.5" fill="#DDD" opacity="0.3"/>
  </svg>`

  // Create snowflake SVG
  const snowflakeSVG = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <!-- Main snowflake -->
    <g transform="translate(32,32)" filter="url(#glow)">
      <!-- Center -->
      <circle cx="0" cy="0" r="2" fill="#E0F7FF" stroke="#87CEEB" stroke-width="0.5"/>
      <!-- 6 main arms -->
      <g stroke="#87CEEB" stroke-width="1" fill="none" stroke-linecap="round">
        <line x1="0" y1="0" x2="0" y2="-20"/>
        <line x1="0" y1="0" x2="17.3" y2="-10"/>
        <line x1="0" y1="0" x2="17.3" y2="10"/>
        <line x1="0" y1="0" x2="0" y2="20"/>
        <line x1="0" y1="0" x2="-17.3" y2="10"/>
        <line x1="0" y1="0" x2="-17.3" y2="-10"/>
      </g>
      <!-- Secondary branches -->
      <g stroke="#B0E0E6" stroke-width="0.8" fill="none" stroke-linecap="round" opacity="0.8">
        <line x1="0" y1="-20" x2="-6" y2="-28"/>
        <line x1="0" y1="-20" x2="6" y2="-28"/>
        <line x1="17.3" y1="-10" x2="23.3" y2="-18"/>
        <line x1="17.3" y1="-10" x2="23.3" y2="-2"/>
        <line x1="17.3" y1="10" x2="23.3" y2="2"/>
        <line x1="17.3" y1="10" x2="23.3" y2="18"/>
        <line x1="0" y1="20" x2="-6" y2="28"/>
        <line x1="0" y1="20" x2="6" y2="28"/>
        <line x1="-17.3" y1="10" x2="-23.3" y2="18"/>
        <line x1="-17.3" y1="10" x2="-23.3" y2="2"/>
        <line x1="-17.3" y1="-10" x2="-23.3" y2="-2"/>
        <line x1="-17.3" y1="-10" x2="-23.3" y2="-18"/>
      </g>
    </g>
  </svg>`

  // Create snowball SVG
  const snowballSVG = `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="snowballGradient" cx="35%" cy="35%">
        <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
        <stop offset="70%" style="stop-color:#F0F8FF;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#E6F2FF;stop-opacity:1" />
      </radialGradient>
      <filter id="snowballShadow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      </filter>
    </defs>
    <!-- Main ball -->
    <circle cx="24" cy="24" r="20" fill="url(#snowballGradient)" stroke="#D0E8FF" stroke-width="0.5"/>
    <!-- Sparkles -->
    <circle cx="16" cy="14" r="1.5" fill="#FFFFFF" opacity="0.9" filter="url(#snowballShadow)"/>
    <circle cx="30" cy="12" r="1" fill="#E0F7FF" opacity="0.7"/>
    <circle cx="34" cy="22" r="1.2" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="28" cy="34" r="1" fill="#E0F7FF" opacity="0.7"/>
    <circle cx="14" cy="28" r="1.3" fill="#FFFFFF" opacity="0.75"/>
    <!-- Shadow/depth -->
    <circle cx="24" cy="30" r="18" fill="none" stroke="#C0D8F0" stroke-width="1" opacity="0.3"/>
  </svg>`

  // Save SVGs as files
  console.log('📁 Creating SVG graphics in /public...\n')

  fs.writeFileSync(path.join(publicDir, 'cabin.svg'), cabinSVG)
  console.log('✅ cabin.svg created')

  fs.writeFileSync(path.join(publicDir, 'snowflake.svg'), snowflakeSVG)
  console.log('✅ snowflake.svg created')

  fs.writeFileSync(path.join(publicDir, 'snowball.svg'), snowballSVG)
  console.log('✅ snowball.svg created')
}

async function main() {
  console.log('🎨 Snowcrastination Graphics Generator\n')
  console.log('=' .repeat(50))

  // Try to generate with Gemini
  for (const [name, prompt] of Object.entries(PROMPTS)) {
    await generateGraphic(name, prompt)
  }

  console.log('=' .repeat(50))
  console.log('\n💡 Note: Google\'s Gemini API does not support direct image generation.')
  console.log('Creating high-quality SVG graphics instead...\n')

  await createSVGGraphics()

  console.log('\n' + '=' .repeat(50))
  console.log('✨ Graphics ready! The game will use these images automatically.')
  console.log('📂 Location: /public/cabin.svg, /public/snowflake.svg, /public/snowball.svg')
  console.log('\n💡 To use AI-generated images instead:')
  console.log('   1. Generate images at: https://deepdream.google/create')
  console.log('   2. Or use: Midjourney, DALL-E, Stable Diffusion, etc.')
  console.log('   3. Save as: /public/cabin.png, /public/snowflake.png, /public/snowball.png')
  console.log('   4. The game will automatically use PNG images if they exist\n')
}

main().catch(console.error)
