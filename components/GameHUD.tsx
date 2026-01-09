'use client'

interface GameHUDProps {
  score: number
  snowPilePercent: number
  isMuted: boolean
  onMuteToggle: () => void
}

export default function GameHUD({ score, snowPilePercent, isMuted, onMuteToggle }: GameHUDProps) {

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6 flex justify-between items-start text-white pointer-events-none">
      {/* Score Card */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md rounded-2xl p-5 md:p-6 pointer-events-auto border-2 border-slate-600/50 shadow-2xl">
        <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Score</div>
        <div className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text">
          {Math.floor(score)}
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={onMuteToggle}
        className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md rounded-2xl p-4 md:p-5 pointer-events-auto hover:from-slate-800/90 hover:to-slate-700/90 transition-all duration-200 border-2 border-slate-600/50 shadow-2xl transform hover:scale-110 active:scale-95 text-2xl md:text-3xl"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Snow Pile Indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md rounded-2xl p-5 md:p-6 pointer-events-auto border-2 border-slate-600/50 shadow-2xl max-w-xs">
        <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Snow Level</div>
        <div className="w-48 md:w-56 h-7 md:h-8 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full overflow-hidden border-2 border-slate-500 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-red-500 transition-all duration-300 shadow-lg"
            style={{ width: `${snowPilePercent * 100}%` }}
          />
        </div>
        <div className="text-xs md:text-sm text-gray-300 mt-2 text-right font-semibold">
          {Math.floor(snowPilePercent * 100)}%
        </div>
      </div>
    </div>
  )
}
