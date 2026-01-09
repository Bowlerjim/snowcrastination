# Snowcrastination - Auto-Claude Project Guide

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [Key Files & Directories](#key-files--directories)
- [Design System: Cyberpunk Winter](#design-system-cyberpunk-winter)
  - [Centralized Theme Configuration](#centralized-theme-configuration)
  - [Color Palette](#color-palette)
  - [CSS Utilities](#css-utilities-in-globalscss)
- [How to Iterate & Update Styles](#how-to-iterate--update-styles)
  - [Quick Color Changes](#quick-color-changes)
  - [Add New Gradient](#add-new-gradient)
  - [Modify Glow Effect Intensity](#modify-glow-effect-intensity)
  - [Add CSS Utility Class](#add-css-utility-class)
- [Game Mechanics](#game-mechanics)
  - [Core Loop](#core-loop)
  - [Scoring](#scoring)
  - [Game State](#game-state)
- [UI Components - Design Notes](#ui-components---design-notes)
  - [MainMenu](#mainmenu)
  - [GameHUD (Overlay)](#gamehud-overlay)
  - [GameOver](#gameover)
  - [Leaderboard](#leaderboard)
- [API Endpoints](#api-endpoints)
- [Development Workflow](#development-workflow)
  - [Local Testing](#local-testing)
  - [Make Changes](#make-changes)
  - [Deploy](#deploy)
- [Performance Considerations](#performance-considerations)
- [Known Patterns](#known-patterns)
- [Next Steps for Enhancement](#next-steps-for-enhancement)
- [Deployment Status](#deployment-status)
- [Tips for Auto-Claude](#tips-for-auto-claude)
  - [Design & Styling Conventions](#design--styling-conventions)
  - [Session Context & Build Progress](#session-context--build-progress)
  - [File Discovery Patterns](#file-discovery-patterns)
  - [Common Task Workflows](#common-task-workflows)
  - [Commit Message Conventions](#commit-message-conventions)
  - [Debugging & Verification](#debugging--verification)
  - [Best Practices](#best-practices)
- [Vercel & GitHub Integration](#vercel--github-integration)
  - [How Deployment Works](#how-deployment-works)
  - [Vercel Dashboard](#vercel-dashboard)
  - [Deployment Flow](#deployment-flow)
  - [GitHub Integration Details](#github-integration-details)
  - [Environment Variables](#environment-variables)
  - [GitHub Secrets](#github-secrets-if-needed-for-cicd)
  - [Monitoring Deployments](#monitoring-deployments)
  - [Common Issues & Solutions](#common-issues--solutions)
  - [Useful Vercel Commands](#useful-vercel-commands-if-using-vercel-cli)
  - [GitHub Actions](#github-actions-optional-future-automation)

---

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

### Design & Styling Conventions

1. **Always reference `lib/theme.ts`** when making style changes - this is the single source of truth
2. **Use component exploration** to understand existing patterns before implementing new features
3. **Test theme changes locally** with `bun run dev` before pushing
4. **Keep design decisions bold** - Cyberpunk Winter is intentional and distinctive
5. **Maintain cyan/gold balance** - 70/30 split is critical for cohesion

### Session Context & Build Progress

6. **Use MCP tools for session context** - Record discoveries and gotchas for future sessions:
   ```bash
   # Record a discovery
   mcp__auto-claude__record_discovery(file_path, description, category)

   # Record a gotcha/pitfall to avoid
   mcp__auto-claude__record_gotcha(gotcha, context)

   # Get context from previous sessions
   mcp__auto-claude__get_session_context()
   ```

7. **Track build progress** - Always check and update the implementation plan:
   ```bash
   # Check current progress
   mcp__auto-claude__get_build_progress()

   # Update subtask status after completing work
   mcp__auto-claude__update_subtask_status(subtask_id, status, notes)
   ```

8. **Reference the spec files** when starting work:
   - `.auto-claude/specs/[feature]/spec.md` - High-level requirements
   - `.auto-claude/specs/[feature]/implementation_plan.json` - Detailed subtasks
   - `.auto-claude/specs/[feature]/context.json` - Service-specific context

### File Discovery Patterns

9. **Use glob for finding files by pattern**:
   ```bash
   # Find all React components
   Glob("components/**/*.tsx")

   # Find all game-related files
   Glob("lib/game/**/*.ts")

   # Find test files
   Glob("**/*.test.ts")
   ```

10. **Use grep for searching content**:
    ```bash
    # Find theme usage across codebase
    Grep("theme\.", type="tsx")

    # Find API endpoint definitions
    Grep("export.*GET|POST", path="app/api")
    ```

11. **Key directories to know**:
    - `/app` - Next.js pages and API routes
    - `/components` - React components
    - `/lib` - Utilities, theme, game engine
    - `/public` - Static assets (images, fonts)
    - `.auto-claude/specs/` - Spec and plan files

### Common Task Workflows

12. **For UI changes**:
    1. Read `lib/theme.ts` for available colors/effects
    2. Check existing component for similar patterns
    3. Make changes using theme values
    4. Test locally: `bun run dev`
    5. Verify no TypeScript errors: `bun run build`

13. **For game logic changes**:
    1. Read `lib/game/GameEngine.ts` for game loop
    2. Check relevant entity files in `lib/game/entities/`
    3. Make changes, test gameplay locally
    4. Verify collision/physics in `lib/game/collision.ts`

14. **For API changes**:
    1. Check existing route in `app/api/`
    2. Follow same pattern for request/response handling
    3. Test endpoint locally: `curl http://localhost:3000/api/[route]`
    4. Handle errors gracefully with try/catch

### Commit Message Conventions

15. **Follow this commit format**:
    ```
    auto-claude: [subtask-id] - [brief description]
    ```
    Examples:
    - `auto-claude: subtask-1-2 - Expand Tips for Auto-Claude section`
    - `auto-claude: subtask-2-1 - Add audio system documentation`
    - `fix: resolve TypeScript error in GameEngine`
    - `feat: add touch controls for mobile`

16. **For multi-file changes**, use descriptive body:
    ```bash
    git commit -m "$(cat <<'EOF'
    auto-claude: subtask-X-Y - Feature description

    - Added component A
    - Updated component B
    - Fixed issue C
    EOF
    )"
    ```

### Debugging & Verification

17. **Before committing, always verify**:
    ```bash
    bun run build          # Check for TypeScript/build errors
    bun run dev            # Manual testing at localhost:3000
    git diff               # Review changes before staging
    ```

18. **If build fails**:
    1. Read error message carefully
    2. Check line numbers referenced
    3. Fix TypeScript errors (type mismatches, missing imports)
    4. Re-run `bun run build` until clean

19. **Check deployment health after push**:
    ```bash
    curl https://snowcrastination.vercel.app/api/health
    ```

### Best Practices

20. **Preserve existing patterns** - Don't reinvent when existing code shows the way
21. **Add comments for complex logic** - Especially in game engine code
22. **Keep commits atomic** - One subtask = one commit when possible
23. **Update build-progress.txt** - Log what you accomplished each session

---

**Last Redesign**: Cyberpunk Winter UI (dark blue + electric cyan + warm gold)
**Author**: Claude Code + Haiku
**Status**: Production Ready ✅

---

## Vercel & GitHub Integration

### How Deployment Works

**Setup**: Snowcrastination is connected to Vercel via GitHub
- **Repository**: github.com/Bowlerjim/snowcrastination
- **Branch**: `main` auto-deploys to production
- **Preview Branches**: Any PR gets automatic preview deployments

### Vercel Dashboard
1. Go to vercel.com and sign in
2. Select "snowcrastination" project
3. View:
   - **Deployments**: History of all deploys with status
   - **Logs**: Real-time build and runtime logs
   - **Environment Variables**: API keys, secrets (Postgres, OpenWeather, etc.)
   - **Settings**: Domain, Git integration, build commands

### Deployment Flow
```
You push to main
    ↓
GitHub webhook triggers Vercel
    ↓
Vercel runs: bun install && bun run build
    ↓
Vercel deploys new version
    ↓
Live at your Vercel URL (snowcrastination.vercel.app or custom domain)
```

### GitHub Integration Details

**What's Connected:**
- `main` branch = production deployment
- Pull requests = automatic preview deployments
- Each commit triggers a build

**Check Deployment Status:**
1. Push to GitHub: `git push`
2. Go to github.com/Bowlerjim/snowcrastination
3. Look for green checkmark next to commit (deployment successful)
4. Click checkmark → "Details" → View Vercel deployment

**Rollback to Previous Version:**
1. Go to Vercel dashboard
2. Find previous deployment in history
3. Click "Promote to Production"
4. Or revert commit in GitHub: `git revert [commit-hash]` then push

### Environment Variables

**In Vercel Project Settings:**
- `NEXT_PUBLIC_OPENWEATHER_API_KEY` - Weather API key
- `POSTGRES_URL` - Database connection (if using Vercel Postgres)
- Any other secrets stored here (never commit to git)

**How to Add:**
1. Vercel dashboard → Settings → Environment Variables
2. Add key-value pairs
3. Redeploy for changes to take effect

### GitHub Secrets (if needed for CI/CD)
Stored in: github.com/Bowlerjim/snowcrastination → Settings → Secrets
- Used for automated scripts
- Not needed for basic Vercel integration (Vercel handles auth)

### Monitoring Deployments

**Quick Health Check:**
```bash
curl https://snowcrastination.vercel.app/api/health
```
Returns JSON with status if app is running.

**View Logs:**
1. Vercel dashboard → Deployments → [latest]
2. Scroll to see build logs and function logs
3. Check for errors during build or runtime

### Common Issues & Solutions

**Issue**: Build fails after push
- Check Vercel logs for error message
- Likely: TypeScript error, missing dependency
- Fix: Run `bun run build` locally first, commit again

**Issue**: Old version still showing
- Hard refresh browser: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
- Clear browser cache
- Check Vercel deployment is marked "Ready"

**Issue**: Environment variables not working
- Verify they're set in Vercel dashboard
- Redeploy after adding (Settings → Redeploy)
- Variables only available at build time for `NEXT_PUBLIC_*`

### Useful Vercel Commands (if using Vercel CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (creates preview)
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs
```

### GitHub Actions (Optional Future Automation)

If you want automated tests/checks before deploy:
1. Create `.github/workflows/ci.yml`
2. Define tests/linting to run on push
3. Vercel waits for GitHub checks before deploying

Example (not currently set up):
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - run: bun run type-check
```

---

**TL;DR for Auto-Claude:**
- Push to main → auto-deploys to Vercel
- Check status on Vercel dashboard or GitHub commit checkmark
- Environment variables in Vercel Settings (not in git)
- View logs in Vercel dashboard if something breaks
