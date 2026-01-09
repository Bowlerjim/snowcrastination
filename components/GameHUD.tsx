'use client'

interface GameHUDProps {
  score: number
  snowPilePercent: number
  isMuted: boolean
  onMuteToggle: () => void
}

export default function GameHUD({ score, snowPilePercent, isMuted, onMuteToggle }: GameHUDProps) {

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-start text-white pointer-events-none">
      {/* Score */}
      <div className="bg-black bg-opacity-50 rounded-lg p-4 pointer-events-auto">
        <div className="text-sm font-semibold text-gray-300">SCORE</div>
        <div className="text-4xl font-bold text-white">{Math.floor(score)}</div>
      </div>

      {/* Mute Button */}
      <button
        onClick={onMuteToggle}
        className="bg-black bg-opacity-50 rounded-lg p-4 pointer-events-auto hover:bg-opacity-70 transition"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Snow Pile Indicator */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 rounded-lg p-4 pointer-events-auto">
        <div className="text-sm font-semibold text-gray-300 mb-2">SNOW LEVEL</div>
        <div className="w-48 h-6 bg-gray-700 rounded-full overflow-hidden border-2 border-gray-500">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-red-500 transition-all duration-200"
            style={{ width: `${snowPilePercent * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">
          {Math.floor(snowPilePercent * 100)}%
        </div>
      </div>
    </div>
  )
}
