# Snowcrastination - Defend Your Cabin

A cozy, atmospheric snowball defense game built with Next.js and Canvas. Defend your cabin from falling snow while watching the environment degrade around you.

## Features

🎮 **Core Gameplay**
- Tap/click to shoot snowballs at falling snowflakes
- Progressive difficulty as the game continues
- Snow pile accumulation system
- Game over when snow reaches critical levels

🏔️ **Visual & Atmosphere**
- Dynamic cabin with degrading visuals based on snow pile
- Smoke particles that fade as cabin gets buried
- Window glow effects that dim with increasing snow
- Color palette shifts from warm to cool tones
- Snowball trails and particle effects

📊 **Leaderboard**
- Top 10 player scores
- Name entry with 10-character limit
- In-game and persistent tracking (with Postgres)

🌡️ **Weather Integration**
- Real-time weather API integration (OpenWeather)
- Contextual messages based on local conditions
- "GOOD NEWS SNOW DAY" when it's snowing
- "SNOW IN THE FORECAST, GET READY TO CHILL" when snow is coming

🔊 **Audio**
- Web Audio API synthesis (no external files needed)
- Dynamic fire crackling ambience
- Snowball throw, hit, and accumulation sounds
- Game over sound effect
- Mute toggle during gameplay

📱 **Mobile Optimized**
- Touch event handling
- Responsive design for all screen sizes
- Portrait and landscape support
- Prevents zoom and scroll interruptions

☕ **Monetization**
- "Buy Me a Hot Chocolate" tip jar integration
- Simple external link (no in-app purchase complexity)

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Game Engine**: HTML5 Canvas with custom physics
- **Styling**: Tailwind CSS 4
- **Package Manager**: Bun
- **Backend**: Next.js API Routes
- **Database**: Vercel Postgres (optional for production)
- **APIs**: OpenWeather API for weather data
- **Deployment**: Vercel

## Quick Start

### Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Open http://localhost:3000
```

### Build for Production

```bash
bun run build
bun start
```

## Game Controls

**Desktop**: Click anywhere on the canvas to shoot a snowball
**Mobile**: Tap anywhere on the screen to shoot a snowball

The snowball will travel toward your tap location.

## API Endpoints

### Leaderboard
- `GET /api/leaderboard` - Get top 10 scores
- `POST /api/leaderboard` - Submit a new score

### Weather
- `GET /api/weather?lat={latitude}&lon={longitude}` - Get weather for location

### Health Check
- `GET /api/health` - API health status

## Deployment

### Vercel Setup

1. **Create GitHub Repository**
```bash
git remote add origin https://github.com/YOUR_USERNAME/snowcrastination.git
git branch -M main
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-deploy on every push to `main`

3. **Configure Environment Variables**
   - Add `OPENWEATHER_API_KEY` from [openweathermap.org](https://openweathermap.org/api)
   - Vercel will auto-set `POSTGRES_URL` after adding database

4. **Add Vercel Postgres Database** (Optional)
   - In Vercel Storage tab, create a Postgres database
   - Run migration SQL from `sql/01-leaderboard-schema.sql`

5. **Update Leaderboard API** (Optional)
   - Currently uses in-memory storage for development
   - Install `@vercel/postgres` to use Postgres in production
   - Update `/app/api/leaderboard/route.ts` to query database

### Buy Me Coffee Integration

1. Sign up at [buymeacoffee.com](https://buymeacoffee.com)
2. Copy your profile URL
3. Update `/components/MainMenu.tsx` line 76 with your URL

## File Structure

```
snowcrastination/
├── app/
│   ├── api/              # API routes
│   │   ├── leaderboard/  # Score management
│   │   ├── weather/      # Weather integration
│   │   └── health/       # Health check
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main game page
├── components/           # React components
│   ├── GameCanvas.tsx    # Main game canvas
│   ├── GameHUD.tsx       # Score/UI overlay
│   ├── GameOver.tsx      # End game screen
│   ├── Leaderboard.tsx   # Score display
│   └── MainMenu.tsx      # Start screen
├── lib/
│   ├── game/             # Game logic
│   │   ├── GameEngine.ts # Core game loop
│   │   ├── collision.ts  # Collision detection
│   │   └── entities/     # Game objects
│   │       ├── Cabin.ts
│   │       ├── Snowball.ts
│   │       └── Snowflake.ts
│   ├── audio/
│   │   └── AudioManager.ts  # Web Audio API
│   └── weather/          # Weather utilities
├── public/               # Static assets
├── sql/                  # Database migrations
├── package.json          # Dependencies
├── next.config.js        # Next.js config
└── tailwind.config.ts    # Tailwind config
```

## Gameplay Mechanics

### Scoring
- Small snowflakes: 10 points
- Medium snowflakes: 20 points
- Large snowflakes: 30 points

### Difficulty Progression
- Snowflakes spawn faster over time
- Spawn rate doubles as you progress
- Fall speeds increase gradually
- More large snowflakes appear

### Loss Conditions
- Game ends when snow pile reaches 100%
- Visual indicators show current pile level
- Cabin becomes increasingly obscured

### Snowflake Behavior
- Fall with realistic gravity acceleration
- Random horizontal drift
- Three size categories
- Different point values

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- 60 FPS target on modern devices
- Optimized collision detection
- Efficient canvas rendering
- Minimal memory footprint

## Future Enhancements

- Power-ups (rapid fire, multi-shot, shield)
- Different difficulty modes
- Custom cabin themes
- Particle system improvements
- Sound asset library
- Difficulty presets
- Local high scores with localStorage
- Analytics and player stats
- Mobile app versions

## Contributing

Feel free to fork and submit pull requests for improvements!

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions:
- Check existing GitHub issues
- Create a new issue with details
- Include browser/OS information

## Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Bun](https://bun.sh)
- [OpenWeather API](https://openweathermap.org)

---

**Snowcrastination** - Where procrastination meets perfect cozy vibes! ❄️☕

Start the game at http://localhost:3000 and defend your cabin!
