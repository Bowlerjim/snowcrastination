import { NextRequest, NextResponse } from 'next/server'

// Temporary in-memory leaderboard for development
let leaderboardData: Array<{ name: string; score: number; timestamp: number }> = [
  { name: 'Player1', score: 1500, timestamp: Date.now() },
  { name: 'Player2', score: 1200, timestamp: Date.now() },
  { name: 'Player3', score: 950, timestamp: Date.now() },
]

export async function GET() {
  try {
    // Sort by score descending and take top 10
    const topScores = leaderboardData
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ name, score }) => ({ name, score }))

    return NextResponse.json({
      success: true,
      scores: topScores,
    })
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { playerName, score } = await request.json()

    // Validate input
    if (!playerName || typeof playerName !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid player name' },
        { status: 400 }
      )
    }

    if (typeof score !== 'number' || score < 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid score' },
        { status: 400 }
      )
    }

    const cleanName = playerName.substring(0, 10).trim()
    if (!cleanName) {
      return NextResponse.json(
        { success: false, error: 'Player name cannot be empty' },
        { status: 400 }
      )
    }

    // Check if score qualifies for leaderboard
    const sortedScores = leaderboardData.sort((a, b) => b.score - a.score)
    const lowestScore = sortedScores[Math.min(9, sortedScores.length - 1)]?.score || 0

    if (leaderboardData.length < 10 || score > lowestScore) {
      // Add to leaderboard
      leaderboardData.push({
        name: cleanName,
        score,
        timestamp: Date.now(),
      })

      // Keep only top 10
      leaderboardData = leaderboardData
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)

      return NextResponse.json({
        success: true,
        message: 'Score added to leaderboard',
        position: leaderboardData.findIndex((s) => s.score === score && s.name === cleanName) + 1,
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Score did not qualify for leaderboard',
      })
    }
  } catch (error) {
    console.error('Failed to submit score:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit score' },
      { status: 500 }
    )
  }
}
