import { useSelector, useDispatch } from 'react-redux'
import { setPlayerOpen } from '../../store/playerSlice'  // controlla che il path sia corretto
import SpotifyPlayer from './SpotifyPlayer'
import SoundCloudPlayer from './SoundCloudPlayer'
import YouTubePlayer from './YouTubePlayer'
import PlayerPlatformButtons from './PlayerPlatformButtons'
import { useState, useEffect } from 'react'

export default function BottomPlayer() {
  const dispatch = useDispatch()
  const { artist, platform, playerOpen } = useSelector((state) => state.player)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState(platform)

  const defaultArtist = {
    name: 'Artista sconosciuto',
    single: 'Brano di anteprima',
    platforms: { spotify: null, soundcloud: null, youtube: 'HjXuELX-7Bg' },
  }

  const activeArtist = artist || defaultArtist
  const activePlatform = platform || 'youtube'

  useEffect(() => {
    if (artist && platform) {
      setIsPlaying(true)
      setSelectedPlatform(platform)
    } else {
      setIsPlaying(false)
    }
  }, [artist, platform])

  // Se non c'è artista o piattaforma attiva, non mostrare nulla
  if (!activeArtist || !activePlatform) return null

  // Funzione per aprire/chiudere il player con Redux
  const toggleOpen = () => {
    dispatch(setPlayerOpen(!playerOpen))
  }

  // Funzione per renderizzare il player in base alla piattaforma selezionata
  const renderPlayer = () => {
    const url = activeArtist.platforms[selectedPlatform]

    switch (selectedPlatform) {
      case 'spotify':
        if (!url) return <div className="p-4 text-center">Nessun link Spotify disponibile</div>
        return (
          <SpotifyPlayer
            url={url}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )
      case 'soundcloud':
        if (!url) return <div className="p-4 text-center">Nessun link SoundCloud disponibile</div>
        return (
          <SoundCloudPlayer
            url={url}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )
      case 'youtube':
        if (!url) return <div className="p-4 text-center">Nessun link YouTube disponibile</div>
        const videoId = url.includes('watch?v=') ? url.split('watch?v=')[1] : url
        return (
          <YouTubePlayer
            videoId={videoId}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )
    }
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-monzadark text-white shadow-lg z-50 transition-all duration-300
        ${playerOpen ? 'h-[360px] py-6 px-8' : 'h-[60px] py-2 px-4'}`}
    >
      <div className="w-full h-full flex items-center justify-between gap-6 relative">
        {/* Info artista (sinistra) */}
        {playerOpen ? (
          <div className="w-[320px] h-full bg-black bg-opacity-60 p-4 rounded-md flex flex-col justify-between">
            <div className="space-y-2 w-full">
              <p className="font-arvo text-3xl text-left truncate">{activeArtist.name}</p>
              <p className="font-arvo text-xl text-left truncate">{activeArtist.single}</p>
              <p className="text-sm text-zinc-300 uppercase tracking-wide text-left">
                {selectedPlatform
                  ? selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
                  : ''}
              </p>
            </div>
            <div className="w-full flex justify-end mt-4">
              <PlayerPlatformButtons
                activeArtist={activeArtist}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3 truncate min-w-0">
            <span className="font-arvo text-sm truncate text-iron">{activeArtist.name}</span>
            <span className="font-arvo text-sm truncate text-iron">— {activeArtist.single}</span>
            <span className="text-xs text-zinc-400 uppercase tracking-wide truncate">
              {activePlatform
                ? activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)
                : ''}
            </span>
          </div>
        )}

        {/* Player (centro) */}
        <div
          className={`rounded-md overflow-hidden transition-all duration-300 ease-in-out flex-shrink-0
            ${playerOpen ? 'w-[400px] h-[220px]' : 'w-[140px] h-[50px] scale-[0.85]'}`}
        >
          {renderPlayer()}
        </div>

        {/* Toggle apertura/chiusura (in alto a destra) */}
        <div className="absolute top-2 right-2">
          <button
            onClick={toggleOpen}
            aria-label={playerOpen ? 'Nascondi player' : 'Espandi player'}
            className="p-2 rounded hover:bg-zinc-700 transition-colors"
          >
            {playerOpen ? (
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
