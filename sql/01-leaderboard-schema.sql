-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  player_name VARCHAR(10) NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);

-- Insert sample data (optional)
-- INSERT INTO leaderboard (player_name, score) VALUES
-- ('Pioneer', 2000),
-- ('Explorer', 1800),
-- ('Adventurer', 1600);
