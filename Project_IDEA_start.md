Project Brief: "Snow Day" Mobile Game

1. High-Level Concept

A "missile commander" style defense game for mobile devices, themed around a cozy log cabin in a snowstorm. The player must defend their cabin from accumulating snow by throwing snowballs. The game will feature a unique atmospheric element where the cabin's coziness visually degrades as the snow piles up.

2. Core Gameplay Mechanics

Objective: Prevent falling snowflakes from hitting the ground and piling up around the cabin.
Player Action: The player launches snowballs from the cabin to intercept and destroy the falling snowflakes. The controls should be simple and intuitive for a touch interface (e.g., tap to shoot).
Losing Condition: The game ends when the snow piles up to a certain critical level (e.g., covers the windows or reaches the roof).
Scoring: Implement a simple scoring system based on the number of snowflakes neutralized.
3. Art, Sound, and Atmosphere

The Cabin: The game starts with the cabin looking warm and inviting: lights on, smoke coming from the chimney, creating a cozy feel.
Dynamic Atmosphere: As snowflakes accumulate on the ground, the environment should change dynamically:
The cabin's interior lights should grow dimmer.
The smoke from the chimney should lessen or stop.
The overall color palette of the scene could become cooler.
Sound Design: The sound should reflect the atmosphere, starting with cozy sounds (a crackling fire) and gradually becoming quieter and more muffled by the snow as the game progresses.
4. Weather API Integration

Feature: The game will check the player's local weather forecast using a simple weather API.
Messaging:
If snow is in the forecast, display a message on the main screen like: "SNOW IN THE FORECAST, GET READY TO CHILL."
If it is actively snowing, display: "GOOD NEWS SNOW DAY."
Functionality: This feature is a fun, cosmetic "easter egg." The game must be fully playable regardless of the actual weather conditions.
5. Monetization

Model: A single, non-intrusive in-app purchase.
Implementation: A "Buy Me a Hot Chocolate" button will act as a "tip jar."
Player Incentive: This one-time purchase will either permanently remove in-game ads or unlock an exclusive, purely decorative item for the cabin (e.g., a wreath on the door, different colored lights).

There should be a simple leaderboard of the top 10 players. If a player scores higher than the lowest player on the leaderboard, they should be added to the leaderboard with a prompt for their name (10 characters max).