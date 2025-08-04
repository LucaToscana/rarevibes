import { useSelector, useDispatch } from 'react-redux'
import { setPlayerOpen, setAutoPlay } from '../../store/playerSlice'
import { useState, useEffect } from 'react'
import TogglePlayerButton from '../players/TogglePlayerButton'
import BottomPlayerDetails from '../players/BottomPlayerDetails'
import ArtistTrackListCard from '../players/ArtistTrackListCard'
import { setArtist, setPlatform } from '../../store/playerSlice'
import SocialLinks from '../artists/SocialLinks'
import defaultArtistRV from '../../../public/data/defaultArtist'
import PlayerRenderer from '../players/PlayerRenderer'
import { addVisitedArtist } from '../../store/visitedArtistsSlice';
import CardStaticWrapper from './CardStaticWrapper'
import FiltersWrapper from './FiltersWrapper'
import SectionTitle from './SectionTitle'
import { Link } from 'react-router-dom'
import ArtistOverlayCard from '../players/ArtistOverlayCard'
import data from '../../data/defaultData'

export default function BottomPlayer() {
  const dispatch = useDispatch()
  // Prende lo stato globale del player da Redux
  const { artist, platform, playerOpen } = useSelector((state) => state.player)
  const [playerKey, setPlayerKey] = useState(0)

  // Stati locali per controllare riproduzione e piattaforma selezionata
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState(platform)

  const [trackList, setTrackList] = useState([])


  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/artists.json')
      .then(res => {
        if (!res.ok) {
          console.log("HTTP error!");
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setTrackList(data.slice(0, 5));
      })
      .catch(err => console.error('Errore nel caricamento artisti:', err));
  }, []);



  // Artist fallback se nessun artista è attivo
  const defaultArtist = defaultArtistRV

  const activeArtist = artist || defaultArtist
  const activePlatform = platform || 'youtube'

  useEffect(() => {
    setPlayerKey(prev => prev + 1)
  }, [artist, platform])
  // Effetto per sincronizzare gli stati locali con quelli globali
  useEffect(() => {
    if (artist && platform) {
      setIsPlaying(true)
      setSelectedPlatform(platform)
    } else {
      setIsPlaying(false)
    }
  }, [artist, platform])

  useEffect(() => {
    if (activeArtist?.id) {
      dispatch(addVisitedArtist(activeArtist));
    }
  }, [activeArtist, dispatch]);
  // Se non c'è artista o piattaforma, non mostrare nulla
  if (!activeArtist || !activePlatform) return null

  // Toggle del player (aperto o chiuso)
  const toggleOpen = () => {
    dispatch(setPlayerOpen(!playerOpen))
  }
  const bgImage = activeArtist.images?.[0] || data.heroImagesDefault[0];

  // Handler per selezione di un artista
  const handleSelect = (item) => {
    const platform = item.defaultPlatform || 'youtube'

    dispatch(setArtist(item))
    dispatch(setPlatform(platform))
    dispatch(setAutoPlay(true))
  }

  // Ottieni URL del singolo per la piattaforma selezionata
  const singles = activeArtist?.singles || []
  const firstSingle = singles.length > 0 ? singles[0] : null
  const url = firstSingle?.platforms?.[selectedPlatform] || ''

  return (
    <>
      <div
        className={`fixed bottom-8 right-6 w-[calc(100vw-3rem)] max-w-sm sm:max-w-fit md:max-w-fit lg:max-w-xl xl:max-w-5xl min-w-[300px] 
    px-4 py-2 md:bottom-10 md:right-8 lg:right-16
    bg-monza text-black shadow-[8px_8px_0px_#000]
    border-[3px] border-black z-40
    transition-all duration-300 ease-in-out
    ${playerOpen ? 'h-fit' : 'h-[60px] py-1 px-4'}
    flex items-center justify-between
    rotate-[-2deg] hover:rotate-0
  `}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Main content wrapper */}
        <div className="flex w-full items-start gap-4 md:items-center">
          {/* Info, Player, and Track List wrapper */}
          <div className="flex flex-grow flex-col gap-4 transition-all xl:flex-row">
            {/* Artist Information */}
            {playerOpen ? (
              <div className="flex flex-col items-start gap-1">
                <CardStaticWrapper>
                  <BottomPlayerDetails
                    activeArtist={activeArtist}
                    selectedPlatform={
                      selectedPlatform
                        ? selectedPlatform.charAt(0).toUpperCase() +
                        selectedPlatform.slice(1)
                        : ''
                    }
                    setSelectedPlatform={setSelectedPlatform}
                  />
                </CardStaticWrapper>
                {/* Music Player Container */}
                <div
                  key={playerKey}
                  className={`relative flex-shrink-0 transition-all duration-300 ease-in-out
          ${playerOpen
                      ? ' w-80 lg:pt-8 lg:px-4 scale-100 opacity-100 sm:w-[300px] lg:w-[400px]'
                      : 'h-0 scale-95 opacity-0'
                    }`}
                >
                  <PlayerRenderer
                    key={playerKey}
                    platform={selectedPlatform}
                    url={url}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                </div>
                {/* Track List - Only visible on specific breakpoints */}

              </div>
            ) : (
              <ArtistOverlayCard
                bgImage={bgImage}
                activeArtist={activeArtist}
                activePlatform={activePlatform}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
                toggleOpen={toggleOpen}
              />
            )}
            {playerOpen && (
              <div className="block   sm:hidden   md:hidden lg:block pt-4">
                <ArtistTrackListCard
                  title="recents"
                  items={trackList}
                  onSelect={handleSelect}
                  selectArtist={artist}
                />
              </div>
            )}


          </div>

          {/* Social Links and Logo (now part of the main flex) */}
          {playerOpen && (
            <div className="absolute bottom-2 right-2 hidden lg:flex lg:flex-col lg:items-end hidden lg:block">
              <SectionTitle>
                <Link to="/">
                  <div className="font-arvo text-xl text-monza">RARE VIBES</div>
                </Link>
              </SectionTitle>
              <div className="mt-auto">
                <FiltersWrapper>
                  <SocialLinks
                    socials={{
                      instagram: 'https://instagram.com/smallenginetechnician',
                      twitter: 'https://twitter.com/smallenginetechnician',
                    }}
                  />
                </FiltersWrapper>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <div className="absolute right-0 top-1">
          <TogglePlayerButton playerOpen={playerOpen} onClick={toggleOpen} />
        </div>
      </div>
    </>
  )
}