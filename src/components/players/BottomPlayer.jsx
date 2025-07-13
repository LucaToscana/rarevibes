import { useSelector, useDispatch } from 'react-redux'
import { setPlayerOpen } from '../../store/playerSlice' // Controlla che il path sia corretto
import SpotifyPlayer from './SpotifyPlayer'
import SoundCloudPlayer from './SoundCloudPlayer'
import YouTubePlayer from './YouTubePlayer'
import PlayerPlatformButtons from './PlayerPlatformButtons'
import { useState, useEffect } from 'react'
import TogglePlayerButton from './TogglePlayerButton'
import BottomPlayerDetails from './BottomPlayerDetails'
import ArtistTrackListCard from './ArtistTrackListCard'
import { setArtist, setPlatform } from '../../store/playerSlice'
import { useNavigate } from 'react-router-dom'
import SocialLinks from '../artists/SocialLinks'

export default function BottomPlayer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoToArtist = () => {
    const artistSlug = activeArtist?.slug || activeArtist?.name?.toLowerCase().replace(/\s/g, "-") || "unknown-artist"
    navigate(`/artists/${artistSlug}`)
  }
  // Prende lo stato globale del player da Redux
  const { artist, platform, playerOpen } = useSelector((state) => state.player)

  // Stati locali per controllare riproduzione e piattaforma selezionata
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState(platform)

  const [trackList, setTrackList] = useState([])

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/newartists.json')
      .then(res => {
        console.log('Response status:', res.status);

        if (!res.ok) {
          console.log("HTTP error!");
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Data ricevuti:', data);
        setTrackList(data.slice(0, 5));
      })
      .catch(err => console.error('Errore nel caricamento artisti:', err));
  }, []);



  const handleSelect = (item) => {
    dispatch(setArtist({
      id: item.id,
      name: item.artist,
      single: item.title,
      images :item.images,
      defaultPlatform :item.defaultPlatform,
      platforms: {
        spotify: item.spotifyUrl,
        soundcloud: item.soundcloudUrl,
        youtube: item.youtubeId,
      },
    }))

    dispatch(setPlatform(item.defaultPlatform))
  }
  // Artist fallback se nessun artista è attivo
  const defaultArtist = {

    id: 1,
    name: 'Artista sconosciuto',
    single: 'Brano di anteprima',
    defaultPlatform:'youtube',
    youtube: "HoaD5vxdgq0",
    platforms: { spotify: null, soundcloud: null, youtube: 'HoaD5vxdgq0' },
    images: [
      "ravibes/artists/Odelia-Monkey-With-a-Hammer.jpg",
      "ravibes/artists/Odelia-Monkey-With-a-Hammer.jpg",
      "ravibes/artists/Odelia-Monkey-With-a-Hammer.jpg"
    ]
  }

  const activeArtist = artist || defaultArtist
  const activePlatform = platform || 'youtube'

  // Effetto per sincronizzare gli stati locali con quelli globali
  useEffect(() => {
    if (artist && platform) {
      setIsPlaying(true)
      setSelectedPlatform(platform)
    } else {
      setIsPlaying(false)
    }
  }, [artist, platform])

  // Se non c'è artista o piattaforma, non mostrare nulla
  if (!activeArtist || !activePlatform) return null

  // Toggle del player (aperto o chiuso)
  const toggleOpen = () => {
    dispatch(setPlayerOpen(!playerOpen))
  }

  // Rendering del player in base alla piattaforma selezionata
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
        // Estrai l'ID del video se è un URL completo
        const videoId = url.includes('watch?v=') ? url.split('watch?v=')[1] : url
        return (
          <YouTubePlayer
            videoId={videoId}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )
      case 'bandcamp':
        if (!url) return <div className="p-4 text-center">Nessun link Bandcamp disponibile</div>

        // Assumiamo che l'url sia del tipo: https://bandcamp.com/EmbeddedPlayer/album=1234567890
        const match = url.match(/album=(\d+)/)
        const albumId = match ? match[1] : null

        if (!albumId) return <div className="p-4 text-center">ID Bandcamp non valido</div>

        return <BandcampPlayer albumId={albumId} />
    }
  }

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 bg-monzadark text-white shadow-lg z-50
        transition-all duration-300
        ${playerOpen ? 'md-h-[560px] lg-h-[460px] py-6 px-8' : 'h-[60px] py-2 px-4'}
        flex items-center justify-between px-6
      `}
    >
      {/* Wrapper principale flex row */}
      <div className="flex flex-row items-center gap-6 w-full">

        {/* Info artista + player + lista tracce */}
        <div className="flex flex-col md:flex-row gap-6 flex-grow">


          {/* Informazioni artista */}
          {playerOpen ? (

            <BottomPlayerDetails activeArtist={activeArtist} selectedPlatform={selectedPlatform
              ? selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
              : ''} setSelectedPlatform={setSelectedPlatform}></BottomPlayerDetails>

          ) : (
            // Vista compatta quando il player è chiuso
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


          {/* Contenitore del player musicale */}
          <div
            className={`relative rounded-md overflow-hidden transition-all duration-300 ease-in-out flex-shrink-0
           ${playerOpen ? 'w-full sm:w-[400px] h-48' : 'w-[350px] h-[50px] scale-[0.85]'}`}
          >
            {renderPlayer()}

            {/* Etichetta sempre in basso */}
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm px-2 py-1 z-10">
              {activeArtist.name} - {activeArtist.single}

            </div>
          </div>

          {playerOpen ? (
            <div className="hidden 2xl:block">
              <ArtistTrackListCard
                title="recents"
                items={trackList}
                onSelect={handleSelect}
              />
            </div>
          ) : null}
        </div>

        {playerOpen ?
          <div className="hidden 2xl:block right-16 p-2">
            <h1 className="font-monoton text-4xl md:text-4xl lg:text-4xl mb-4 tracking-tight">RARE VIBES</h1>
          </div>
          : <></>}
        <div className="fixed bottom-0 right-16 p-2 hidden xl:block">
          <SocialLinks socials={{
            instagram: "https://instagram.com/smallenginetechnician",
            twitter: "https://twitter.com/smallenginetechnician"
          }} />
        </div>

      </div>



      {/* Bottone per aprire/chiudere il player */}
      <div className="absolute top-2 right-2">
        <TogglePlayerButton playerOpen={playerOpen} onClick={toggleOpen} />
      </div>


    </div>
  )
}
