# Snowcrastination - Auto-Claude Project Guide

## Project Overview
A cozy snowball defense game with a Cyberpunk Winter aesthetic, AI-generated graphics via Gemini 3 Pro, and a leaderboard system.

**Status**: Deployed to Vercel | **Last Updated**: Cyberpunk Winter UI redesign complete

## Architecture

### Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4 with custom cyberpunk theme
- **Game Engine**: HTML5 Canvas (custom implementation)
- **Audio**: Web Audio API (synthesized)
- **Database**: Vercel Postgres (optional, in-memory for dev)
- **Package Manager**: Bun
- **Deployment**: Vercel (auto-deploy on push to main)

### Key Files & Directories
```
/app
  ├── page.tsx                    # Main orchestrator
  ├── globals.css               # Global styles + neon utilities
  ├── layout.tsx                # Root layout
  └── api/
      ├── leaderboard/route.ts  # Score API
      ├── weather/route.ts      # OpenWeather integration
      └── health/route.ts       # Health check

/components
  ├── MainMenu.tsx              # Start screen with leaderboard
  ├── GameCanvas.tsx            # Game renderer + HUD container
  ├── GameHUD.tsx               # Score, mute, snow level overlay
  ├── GameOver.tsx              # End screen + score submission
  └── Leaderboard.tsx           # Reusable leaderboard display

/lib
  ├── theme.ts                  # CENTRALIZED THEME CONFIG ⭐
  └── game/
      ├── GameEngine.ts         # Core game loop & logic
      ├── collision.ts          # Physics
      ├── ImageManager.ts       # Graphics caching
      └── entities/
          ├── Cabin.ts
          ├── Snowflake.ts
          └── Snowball.ts

/public
  └── cabin.png / snowflake.png / snowball.png  # AI-generated graphics
```

## Design System: Cyberpunk Winter

### Centralized Theme Configuration
**File**: `/lib/theme.ts` - Single source of truth for all design values

All colors, gradients, shadows, and effects are defined here. Update this file to change appearance globally.

```typescript
theme.colors.cyan.glow      // Primary accent: #06b6d4
theme.colors.gold.primary   // Interactive accent: #f59e0b
theme.colors.bg.primary     // Dark background: #0f172a
theme.effects.glowCyan      // Cyan neon shadow
theme.gradients.buttonPrimary  // Gold button gradient
```

### Color Palette
- **Dark Backgrounds**: `#0f172a`, `#1e3a5f`, `#1a2a4a` (match game canvas)
- **Electric Cyan**: `#06b6d4` (primary UI accents) - 70% of design
- **Warm Gold**: `#f59e0b` (interactive CTAs) - 30% of design
- **Functional**: Success `#10b981`, Danger `#ef4444`
- **Text**: Ice blue `#e0f2fe`, White `#ffffff`

### CSS Utilities (in globals.css)
- `.neon-cyan`, `.neon-cyan-strong` - Cyan glow effects
- `.neon-gold`, `.neon-gold-strong` - Gold glow effects
- `.glass-cyber`, `.glass-cyber-strong` - Glass-morphism containers
- `.text-glow-cyan`, `.text-glow-gold` - Text shadows
- `.animate-pulse-glow-cyan`, `.animate-pulse-glow-gold` - Pulse animations

## How to Iterate & Update Styles

### Quick Color Changes
1. Open `/lib/theme.ts`
2. Update hex codes in `theme.colors`
3. **Everything updates automatically** - no need to touch components

Example:
```typescript
// Change primary cyan
cyan: {
  glow: '#00D4FF',  // New color
  // ... rest stays same
}
```

### Add New Gradient
```typescript
// In theme.ts under gradients
myNewGradient: 'linear-gradient(135deg, #color1 0%, #color2 100%)'

// In components, use it:
style={{ background: theme.gradients.myNewGradient }}
```

### Modify Glow Effect Intensity
```typescript
// In theme.ts
glowCyan: '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.4)'
// Increase opacity values for stronger glow
```

### Add CSS Utility Class
```typescript
// Add to globals.css
.my-new-effect {
  box-shadow: YOUR_SHADOW_HERE;
  transition: all 0.3s ease;
}

// Use in components
<div className="my-new-effect" />
```

## Game Mechanics

### Core Loop
1. Player clicks/taps canvas to shoot snowballs at falling snowflakes
2. Snowflakes fall with physics (gravity, drift)
3. Snowflakes that hit ground accumulate snow (0-100%)
4. Snow level increases difficulty (spawn rate increases)
5. Game ends when snow reaches 100%

### Scoring
- Small snowflake: 10 points
- Medium snowflake: 20 points
- Large snowflake: 30 points

### Game State
- `GameEngine.getScore()` - Current score
- `GameEngine.getSnowPilePercent()` - Snow accumulation (0-1)
- `GameEngine.onGameOver()` - Callback when game ends

## UI Components - Design Notes

### MainMenu
- **Background**: Dark blue gradient matching canvas
- **START GAME Button**: Gold gradient + strong gold glow (primary CTA)
- **Leaderboard Container**: Dark glass + cyan border
- **Weather Card**: Cyan background with cyan glow

### GameHUD (Overlay)
- **Score Display**: Cyan-to-gold gradient text with cyan glow
- **Mute Button**: Glass container with cyan border
- **Snow Level Bar**:
  - 0-50%: Pure cyan gradient (safe)
  - 50-75%: Cyan→gold transition (warning)
  - 75-100%: Gold→red gradient (danger) + red glow

### GameOver
- **Container**: Cyberpunk glass with red/cyan pulsing border
- **Title**: Red text with dual glow effect
- **Score**: Cyan-gold gradient with cyan glow
- **Submit Button**: Cyan-to-gold gradient with strong glow
- **Play Again**: Green button with subtle cyan glow

### Leaderboard
- **Rank Medals**: Cyan text with glow (top 3)
- **Scores**: Cyan-to-gold gradient
- **Hover State**: Cyan glow background effect

## API Endpoints

### `/api/leaderboard`
- **GET**: Returns top 10 scores
- **POST**: Submit score (playerName, score)

### `/api/weather`
- **GET**: Returns contextual message based on location weather

### `/api/health`
- **GET**: Simple status check

## Development Workflow

### Local Testing
```bash
bun install      # Install dependencies
bun run dev      # Start dev server (localhost:3000)
```

### Make Changes
1. Edit theme in `/lib/theme.ts` for colors/effects
2. Edit components in `/components/` for layout/behavior
3. Changes reflect instantly in dev server

### Deploy
```bash
git add .
git commit -m "Your message"
git push                # Auto-deploys to Vercel
```

## Performance Considerations

- **60 FPS Target**: Canvas optimized for smooth gameplay
- **Image Caching**: ImageManager prevents redundant loads
- **Minimal Re-renders**: Game logic isolated in Canvas
- **Web Audio**: Synthesized sounds (no external files)

## Known Patterns

### Using Theme in Components
```typescript
import { theme } from '@/lib/theme'

<div style={{ 
  background: theme.gradients.buttonPrimary,
  color: theme.colors.cyan.glow,
  boxShadow: theme.effects.glowCyan
}} />
```

### Dynamic Snow Level Colors
```typescript
const getSnowGradient = () => {
  if (snowPilePercent < 0.5) return theme.gradients.progressSafe
  if (snowPilePercent < 0.75) return theme.gradients.progressWarning
  return theme.gradients.progressDanger
}
```

### Glass-Morphism Container
```typescript
<div className="glass-cyber" style={{ borderColor: theme.colors.cyan.glow }} />
```

## Next Steps for Enhancement

1. **Visual Polish**: Adjust neon glow intensities in `theme.ts`
2. **New Colors**: Add seasonal themes (Summer, Holiday, etc.)
3. **Animations**: Add more keyframes in `tailwind.config.ts`
4. **Responsive**: Fine-tune breakpoints for different screen sizes
5. **Accessibility**: Ensure text contrast meets WCAG AA

## Deployment Status

**Current**: Live on Vercel
- Main branch auto-deploys
- Check Vercel dashboard for deployment logs
- Environment variables: Stored in Vercel project settings

## Tips for Auto-Claude

1. **Always reference `lib/theme.ts`** when making style changes
2. **Use component exploration** to understand existing patterns
3. **Test theme changes locally** before pushing
4. **Keep design decisions bold** - Cyberpunk Winter is intentional and distinctive
5. **Maintain cyan/gold balance** - 70/30 split is critical for cohesion

---

**Last Redesign**: Cyberpunk Winter UI (dark blue + electric cyan + warm gold)
**Author**: Claude Code + Haiku
**Status**: Production Ready ✅
