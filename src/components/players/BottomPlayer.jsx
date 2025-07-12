import { useSelector } from 'react-redux'
import SpotifyPlayer from './SpotifyPlayer'
import SoundCloudPlayer from './SoundCloudPlayer'
import YouTubePlayer from './YouTubePlayer'
import { useState, useEffect } from 'react'

export default function BottomPlayer() {
  const { artist, platform } = useSelector((state) => state.player)
  const [isOpen, setIsOpen] = useState(Boolean(artist && platform))
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState(platform)
  const [manualClose, setManualClose] = useState(false)

  const defaultArtist = {
    name: 'Artista sconosciuto',
    single: 'Brano di anteprima',
    spotify: null,
    soundcloud: null,
    youtube: 'HjXuELX-7Bg',
  }

  const activeArtist = artist || defaultArtist
  const activePlatform = platform || 'youtube'

  useEffect(() => {
    if (artist && platform) {
      if (!manualClose) {  // solo se l’utente non ha chiuso manualmente
        setIsOpen(true)
        setIsPlaying(true)
        setSelectedPlatform(platform)
      }
    } else {
      // Se non c’è artista o piattaforma, chiudo e resetto manualClose
      setIsOpen(false)
      setIsPlaying(false)
      setManualClose(false)
    }
  }, [artist, platform, manualClose])

  if (!activeArtist || !activePlatform) return null

  const renderPlayer = () => {
    switch (selectedPlatform) {
      case 'spotify':
        return (
          <SpotifyPlayer
            url={activeArtist.spotify}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )
      case 'soundcloud':
        return (
          <SoundCloudPlayer
            url={activeArtist.soundcloud}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )
      case 'youtube':
        if (!activeArtist.youtube) return <div>No YouTube link</div>
        const videoId = activeArtist.youtube.includes('watch?v=')
          ? activeArtist.youtube.replace('watch?v=', '')
          : activeArtist.youtube
        return (
          <YouTubePlayer
            videoId={videoId}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )
      default:
        return <div>Seleziona una piattaforma</div>
    }
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-monzadark text-white shadow-lg z-50 transition-all duration-300
        ${isOpen ? 'h-[360px] py-6 px-8' : 'h-[60px] py-2 px-4'}
      `}
    >
      <div className="w-full h-full flex items-center justify-between gap-6">
        {/* Info artista (sx) */}
        {isOpen ? (
          <div className="w-[320px] h-full bg-black bg-opacity-60 p-4 rounded-md flex flex-col justify-center">
            <span className="font-arvo text-3xl truncate">{activeArtist.name}</span>
            <span className="font-arvo text-xl mt-1 truncate">{activeArtist.single}</span>
            <span className="text-sm text-zinc-300 uppercase tracking-wide mt-2">
             {selectedPlatform ? selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1) : ''}
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-3 truncate min-w-0">
            <span className="font-arvo text-sm truncate text-iron">{activeArtist.name}</span>
            <span className="font-arvo text-sm truncate text-iron">— {activeArtist.single}</span>
            <span className="text-xs text-zinc-400 uppercase tracking-wide truncate">
             {activePlatform ? activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1) : ''}
            </span>
          </div>
        )}

        {/* Player (centro) */}
        <div
          className={`rounded-md overflow-hidden transition-all duration-300 ease-in-out flex-shrink-0
            ${isOpen ? 'w-[400px] h-[220px]' : 'w-[140px] h-[50px] scale-[0.85]'}
          `}
        >
          {renderPlayer()}
        </div>

        {/* Bottoni + chiudi (dx) */}
        {isOpen && (
          <div className="flex flex-col items-end justify-between h-full p-2">
            <div className="flex space-x-3 mb-4">
              {activeArtist.spotify && (
                <button
                  onClick={() => setSelectedPlatform('spotify')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                    selectedPlatform === 'spotify'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white'
                  }`}
                >
                  Spotify
                </button>
              )}
              {activeArtist.soundcloud && (
                <button
                  onClick={() => setSelectedPlatform('soundcloud')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                    selectedPlatform === 'soundcloud'
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-orange-500 hover:text-white'
                  }`}
                >
                  SoundCloud
                </button>
              )}
              {activeArtist.youtube && (
                <button
                  onClick={() => setSelectedPlatform('youtube')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                    selectedPlatform === 'youtube'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  YouTube
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setIsOpen(false)
                setManualClose(true) // segnalo la chiusura manuale
              }}
              className="text-sm text-zinc-300 hover:text-white underline"
            >
              Chiudi
            </button>
          </div>
        )}

        {/* Toggle (in alto a destra) */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Nascondi player' : 'Espandi player'}
            className="p-2 rounded hover:bg-zinc-700 transition-colors"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-zinc-300 hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-zinc-300 hover:text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
