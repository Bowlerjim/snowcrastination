#!/usr/bin/env python3
"""
Generate premium game graphics using Google Gemini 3 Pro Image Preview API
"""

import os
import base64
from pathlib import Path

try:
    from google import genai
except ImportError:
    print("❌ google-genai package not found")
    print("Install with: pip install google-genai")
    exit(1)

# API Configuration
API_KEY = os.getenv('GOOGLE_API_KEY') or 'AIzaSyA_y8qqvpPboxJxERYCfvkoZ74p7E48e1Q'
OUTPUT_DIR = Path(__file__).parent.parent / 'public'

# Ensure output directory exists
OUTPUT_DIR.mkdir(exist_ok=True)

# Initialize client
client = genai.Client(api_key=API_KEY)

# Detailed prompts for premium graphics
PROMPTS = {
    'cabin': """Create a high-quality, ultra-detailed illustration of a cozy snow-covered wooden cabin perfect for a winter game:

STYLE: High-quality digital illustration, magical winter theme, warm and inviting
LIGHTING: Warm golden glow from windows, dramatic winter lighting, soft shadows from moonlight

DETAILS:
- Charming rustic log cabin with brown wooden logs
- Steep snow-covered roof with thick snow accumulation
- Two large glowing windows showing warm interior light (golden/orange glow)
- Chimney with visible wispy white smoke curling upward
- Heavy snow drifts piled around the base and corners
- Dark door with small covered porch
- Icicles hanging from eaves
- Pine trees or winter landscape in background (soft focus)

MOOD: Cozy, peaceful, winter wonderland, inviting refuge
QUALITY: Highly detailed, smooth gradients, professional illustration
FORMAT: 512x512 PNG with transparent or light blue background
GAME USE: Perfect for a winter defense game as a main focal point""",

    'snowflake': """Create a stunning, intricate snowflake illustration perfect for a game:

STYLE: Photorealistic ice crystal, magical sparkle effect, winter aesthetic
DETAIL: Hyper-detailed crystalline structure with perfect symmetry

SPECIFICATIONS:
- Perfect hexagonal symmetry (true snowflake geometry)
- Intricate branch patterns with secondary and tertiary branches
- Translucent ice blue and white coloring with slight iridescence
- Sparkly, magical quality with subtle light reflections
- Individual ice facets visible with detail
- Center crystal nucleus with fractal-like branching
- Soft glow around edges suggesting magical properties

EFFECTS:
- Subtle gradient from center to edges
- Light refraction effects like real ice
- Sparkle points of light (like diamonds)

MOOD: Magical, beautiful, peaceful winter
QUALITY: Ultra-detailed, photorealistic ice crystal
FORMAT: 256x256 PNG with transparent background
GAME USE: Large falling snowflake for game, no background needed""",

    'snowball': """Create a gorgeous 3D snowball illustration perfect for a winter game:

STYLE: Photorealistic 3D rendered snowball, winter game asset
RENDERING: High-quality 3D rendering with proper lighting

DETAILS:
- Perfectly round spherical snowball
- Bright white snow with realistic texture and slight bumps
- Subtle surface imperfections and texture variation
- Multiple sparkles and ice crystal reflections on surface
- Proper lighting with shadow/depth on bottom
- Glossy ice coating with shine points
- Subtle color variation from white to light blue in shadows

EFFECTS:
- Realistic specular highlights (shine spots)
- Soft shadow underneath for depth
- Small ice sparkles scattered across surface
- Cold, icy appearance

MOOD: Satisfying, ready to throw, crisp winter feel
QUALITY: Professional 3D render quality
FORMAT: 128x128 PNG with transparent background
GAME USE: Snowball projectile in game, high quality appearance"""
}

def generate_image(name: str, prompt: str) -> bool:
    """Generate an image using Gemini 3 Pro and save it"""
    try:
        print(f"\n🎨 Generating {name}...")
        print(f"   Using model: gemini-3-pro-image-preview")

        # Generate image
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=prompt
        )

        # Extract image data
        if not response.candidates:
            print(f"   ❌ No response from API")
            return False

        image_data = response.candidates[0].content.parts[0].inline_data.data

        # Decode and save
        if isinstance(image_data, str):
            image_bytes = base64.b64decode(image_data)
        else:
            image_bytes = image_data

        filename = OUTPUT_DIR / f"{name}.png"
        with open(filename, 'wb') as f:
            f.write(image_bytes)

        file_size = len(image_bytes) / 1024  # KB
        print(f"   ✅ Saved: {filename} ({file_size:.1f} KB)")
        return True

    except Exception as e:
        print(f"   ❌ Error generating {name}: {str(e)}")
        return False

def main():
    print("=" * 60)
    print("🎨 Snowcrastination Premium Graphics Generator")
    print("   Using Google Gemini 3 Pro Image Preview API")
    print("=" * 60)

    results = {}
    for name, prompt in PROMPTS.items():
        results[name] = generate_image(name, prompt)

    print("\n" + "=" * 60)
    print("📊 Generation Summary")
    print("=" * 60)

    success_count = sum(1 for v in results.values() if v)
    total_count = len(results)

    for name, success in results.items():
        status = "✅ Success" if success else "❌ Failed"
        print(f"  {name.capitalize():15} {status}")

    print(f"\n  Total: {success_count}/{total_count} generated successfully")

    if success_count == total_count:
        print("\n✨ All graphics generated! They're ready to use.")
        print(f"📂 Location: {OUTPUT_DIR}")
        print("\n🚀 The game will automatically use these PNG images")
        print("   No code changes needed - just push to deploy!\n")
    else:
        print(f"\n⚠️  {total_count - success_count} image(s) failed to generate")
        print("   Check your API key and internet connection\n")

    return success_count == total_count

if __name__ == "__main__":
    try:
        success = main()
        exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⏸️  Generation cancelled by user")
        exit(1)
