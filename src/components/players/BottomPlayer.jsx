import { useSelector, useDispatch } from 'react-redux'
import { setPlayerOpen, setAutoPlay } from '../../store/playerSlice' // Controlla che il path sia corretto
import SpotifyPlayer from './SpotifyPlayer'
import SoundCloudPlayer from './SoundCloudPlayer'
import YouTubePlayer from './YouTubePlayer'
import { useState, useEffect } from 'react'
import TogglePlayerButton from './TogglePlayerButton'
import BottomPlayerDetails from './BottomPlayerDetails'
import ArtistTrackListCard from './ArtistTrackListCard'
import { setArtist, setPlatform } from '../../store/playerSlice'
import SocialLinks from '../artists/SocialLinks'
import defaultArtistRV from '../../../public/data/defaultArtist' // adatta il path alla posizione reale
import GlobalPlayPauseButton from './GlobalPlayPauseButton'


export default function BottomPlayer() {
  const dispatch = useDispatch()
  // Prende lo stato globale del player da Redux
  const { artist, platform, playerOpen, autoPlay } = useSelector((state) => state.player)
  const [playerKey, setPlayerKey] = useState(0)

  // Stati locali per controllare riproduzione e piattaforma selezionata
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState(platform)

  const [trackList, setTrackList] = useState([])

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/artists.json')
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



  // Artist fallback se nessun artista è attivo
  const defaultArtist = defaultArtistRV

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
  const bgImage = activeArtist.images?.[0] || 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg'

  const handleSelect = (item) => {
    dispatch(setArtist(item))
    dispatch(setPlatform(item.defaultPlatform))
    dispatch(setAutoPlay(true))

  }
  const handleSelectPlay = (item) => {
    console.log(item, item.defaultPlatform)
    dispatch(setArtist(item))
    dispatch(setPlatform(item.defaultPlatform))
    toggleOpen
    dispatch(setAutoPlay(!autoPlay))
    setPlayerKey(prev => prev + 1)
    setIsPlaying(!isPlaying)
  }




  // Rendering del player in base alla piattaforma selezionata
  const renderPlayer = () => {
    const url = activeArtist.singles?.[0]?.platforms?.[selectedPlatform];
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
        fixed bottom-0 left-0 right-0 bg-monzadark text-white shadow-lg z-40
        transition-all duration-300
        ${playerOpen ? 'md-h-[560px] lg-h-[460px] py-6 px-8' : 'h-[60px] py-2 px-4'}
        flex items-center justify-between px-6
      `}
    >
      {/* Wrapper principale flex row */}
      <div className="flex flex-row items-center gap-6 w-full">

        {/* Info artista + player + lista tracce */}
        <div
          className="flex flex-col md:flex-row gap-1 md:gap-6 flex-grow transition-all ">


          {/* Informazioni artista */}
          {playerOpen ? (

            <BottomPlayerDetails activeArtist={activeArtist} selectedPlatform={selectedPlatform
              ? selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
              : ''} setSelectedPlatform={setSelectedPlatform}></BottomPlayerDetails>

          ) : (
            // Vista compatta quando il player è chiuso
            <div className="absolute inset-0 bg-black bg-opacity-50 transition  cursor-pointer duration-300 group-hover:bg-opacity-60"
              onClick={toggleOpen}
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Overlay scuro trasparente */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Contenuto testo */}
              <div
                className="relative z-40  p-4 h-full text-white flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span
                    className="font-arvo text-sm uppercase truncate"
                    title={activeArtist.name}
                  >
                    {activeArtist.name}
                  </span>

                  {/* Separatore - */}
                  <span className="text-sm opacity-50 select-none">-</span>
                  <span
                    className="font-arvo text-sm italic truncate opacity-90"
                    title={activeArtist.singles?.[0]?.title}
                  >
                    {activeArtist.singles?.[0]?.title}
                  </span>
                </div>

                <span
                  className="text-sm tracking-wide truncate opacity-70 hidden md:block"
                  title={activePlatform}
                >
                  {activePlatform ? activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1) : ''}
                </span>
              </div>

            </div>

          )}


          {/* Contenitore del player musicale */}
          <div
            key={playerKey}
            className={`relative rounded-md overflow-hidden transition-all duration-300 ease-in-out flex-shrink-0
           ${playerOpen ? 'w-full sm:w-[400px] h-48' : 'hidden w-[350px] h-[50px] scale-[0.85]'}`}
          >
            {renderPlayer()}

            {/* Etichetta sempre in basso */}
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm px-2 py-1 z-40">
              {activeArtist.name} -  {activeArtist.singles?.[0]?.title}

            </div>
          </div>

          {playerOpen ? (
            <div //className="hidden 2xl:block"
            >
              <ArtistTrackListCard
                title="recents"
                items={trackList}
                onSelect={handleSelect}
              />
            </div>
          ) : null}
        </div>

        {!playerOpen && activeArtist.defaultPlatform === 'youtube' && (

          <GlobalPlayPauseButton
            isPlaying={isPlaying}
            onToggle={() => handleSelectPlay(activeArtist)}
            position="bottom-3 left-80"
          />
        )}

        {/** SocialLinks */}
        {playerOpen ?
          <div className="hidden 2xl:block bottom-1 right-16 p-2">
            <h1 className="font-monoton text-4xl md:text-4xl lg:text-4xl mb-4 tracking-tight">RARE VIBES</h1>
          </div>
          : <> </>}

      </div>

      <div className="fixed right-16 mt-1 bottom-1 hidden xl:block z-50"
      >
        <SocialLinks socials={{
          instagram: "https://instagram.com/smallenginetechnician",
          twitter: "https://twitter.com/smallenginetechnician"
        }} />
      </div>

      {/* Bottone per aprire/chiudere il player */}
      <div className="absolute top-2 right-2 ">
        <TogglePlayerButton playerOpen={playerOpen} onClick={toggleOpen} />
      </div>

    </div>
  )
}
