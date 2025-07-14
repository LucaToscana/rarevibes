export default function GlobalPlayPauseButton({ position = "bottom-12 left-64", isPlaying, onToggle }) {
  return (
    <div className={`fixed ${position} z-50`}>
      <button
        onClick={onToggle}
        className="bg-white text-monzadark hover:bg-monzadark hover:text-white border border-white transition-all duration-200 rounded-full p-2 shadow-lg"
        title={isPlaying ? 'Pausa' : 'Play'}
      >
        {isPlaying ? (
          // Icona Pausa
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          // Icona Play
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4l15 8-15 8z" />
          </svg>
        )}
      </button>
    </div>
  )
}
