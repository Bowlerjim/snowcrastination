# Snowcrastination Setup Guide

## Local Development

```bash
# Install dependencies (with Bun)
bun install

# Start dev server
bun run dev

# Open http://localhost:3000
```

## GitHub Setup

1. Create a new repository on GitHub: `snowcrastination`
2. Push the code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/snowcrastination.git
git branch -M main
git push -u origin main
```

## Vercel Deployment

### 1. Create Vercel Project
- Go to [vercel.com](https://vercel.com)
- Click "Add New" > "Project"
- Import from GitHub repository
- Auto-deploy is enabled by default

### 2. Add Environment Variables
In Vercel project settings, add:
- `OPENWEATHER_API_KEY`: Free API key from [openweathermap.org](https://openweathermap.org/api)

### 3. Add Vercel Postgres Database
- In Vercel Storage tab, create a Postgres database
- Vercel will automatically set `POSTGRES_URL`
- Run the migration SQL (see below)

### 4. Database Migration
Connect to your Vercel Postgres database and run:

```sql
-- Run contents of sql/01-leaderboard-schema.sql
CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  player_name VARCHAR(10) NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);
```

## API Integration

The leaderboard API currently uses in-memory storage for development. To use the Postgres database:

1. Install Postgres client:
```bash
bun add @vercel/postgres
```

2. Update `/app/api/leaderboard/route.ts` to use the database instead of in-memory storage

3. Deploy to Vercel

## Buy Me Coffee Link

Update the Buy Me Coffee link in `/components/MainMenu.tsx`:
- Sign up at [buymeacoffee.com](https://buymeacoffee.com)
- Replace the link with your profile URL

## Testing

### Local Testing
- Open http://localhost:3000
- Click "Start Game"
- Tap/click to shoot snowballs at falling snowflakes
- Defend the cabin until snow pile reaches 100%
- Submit your score (leaderboard uses in-memory storage locally)

### Mobile Testing
- Open http://localhost:3000 on your phone
- Touch events should work for shooting
- Test in both portrait and landscape

### API Testing
```bash
# Test leaderboard
curl http://localhost:3000/api/leaderboard

# Test weather
curl "http://localhost:3000/api/weather?lat=40.7128&lon=-74.0060"

# Test health
curl http://localhost:3000/api/health
```

## Next Steps

1. Add audio assets (optional - currently uses Web Audio API synthesis)
2. Update Buy Me Coffee link
3. Set up OpenWeather API key
4. Deploy to Vercel
5. Test on mobile devices
6. Add more visual polish and particle effects

## Troubleshooting

### Canvas not rendering?
- Check browser console for errors
- Ensure JavaScript is enabled
- Try a different browser

### Weather not showing?
- Get a free API key from [openweathermap.org](https://openweathermap.org/api)
- Add it as `OPENWEATHER_API_KEY` environment variable

### Leaderboard not working?
- In development: uses in-memory storage (resets on server restart)
- In production: ensure Postgres database is set up with migration SQL

### Audio not playing?
- Check browser autoplay policies (iOS requires user interaction)
- Audio uses Web Audio API synthesis (no external files needed)
