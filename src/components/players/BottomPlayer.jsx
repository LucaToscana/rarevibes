import { useSelector, useDispatch } from 'react-redux'
import { setPlayerOpen, setAutoPlay } from '../../store/playerSlice' // Controlla che il path sia corretto
import SpotifyPlayer from './SpotifyPlayer'
import SoundCloudPlayer from './SoundCloudPlayer'
import YouTubePlayer from './YouTubePlayer'
import PlayerPlatformButtons from './PlayerPlatformButtons'
import { useState, useEffect } from 'react'
import TogglePlayerButton from './TogglePlayerButton'
import BottomPlayerDetails from './BottomPlayerDetails'
import ArtistTrackListCard from './ArtistTrackListCard'
import { setArtist, setPlatform } from '../../store/playerSlice'
import SocialLinks from '../artists/SocialLinks'
import YouTubePlayerButton from './YouTubePlayerButton'

export default function BottomPlayer() {
  const dispatch = useDispatch()
  // Prende lo stato globale del player da Redux
  const { artist, platform, playerOpen } = useSelector((state) => state.player)

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



  const handleSelect = (item) => {
    dispatch(setArtist(item))
    dispatch(setPlatform(item.defaultPlatform))
    dispatch(setAutoPlay(true))

  }
  // Artist fallback se nessun artista è attivo
  const defaultArtist = {
    "id": 1,
    "name": "Odelia",
    "slug": "odelia",
    "type": "musician",
    "images": [
      "/artists/Odelia-Monkey-With-a-Hammer.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/53f6c717180319.5634931be500f.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/864dbe22634873.563161cc37e95.jpg"
    ],
    "bio": "Artist 1 is an emerging talent known for creating captivating music and engaging performances. Their unique style blends multiple genres, making them stand out in the music industry. With a growing fan base and consistent releases, Artist 1 is definitely one to watch in the coming years. Their passion for music drives every aspect of their creative journey.",
    "single": "Single 1",
    "defaultPlatform": "youtube",
    "platforms": {
      "spotify": "https://open.spotify.com/intl-fr/track/7lCEg0huq6nTZihGD8YVTo?si=b22a9490a27a4f13",
      "soundcloud": "https://soundcloud.com/ruralmidibrigade/sitar-killer-6?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      "youtube": "HoaD5vxdgq0"
    },
    "socials": {
      "instagram": "https://instagram.com/smallenginetechnician",
      "twitter": "https://twitter.com/smallenginetechnician"
    }
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
  const bgImage = activeArtist.images?.[0] || 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg'

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
        <div className="flex flex-col md:flex-row gap-1 md:gap-6 flex-grow">


          {/* Informazioni artista */}
          {playerOpen ? (

            <BottomPlayerDetails activeArtist={activeArtist} selectedPlatform={selectedPlatform
              ? selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
              : ''} setSelectedPlatform={setSelectedPlatform}></BottomPlayerDetails>

          ) : (
            // Vista compatta quando il player è chiuso
            <div
              className="relative rounded-lg overflow-hidden max-w-sm w-full "
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
                className="relative z-10 p-4 h-full text-white flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
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
                    title={activeArtist.single}
                  >
                    {activeArtist.single}
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
            className={`relative rounded-md overflow-hidden transition-all duration-300 ease-in-out flex-shrink-0
           ${playerOpen ? 'w-full sm:w-[400px] h-48' : 'hidden w-[350px] h-[50px] scale-[0.85]'}`}
          >
            {renderPlayer()}

            {/* Etichetta sempre in basso */}
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm px-2 py-1 z-10">
              {activeArtist.name} - {activeArtist.single}

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




        {/** SocialLinks */}
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
