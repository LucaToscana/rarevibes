import { useSelector, useDispatch } from 'react-redux'
import { setPlayerOpen, setAutoPlay } from '../../store/playerSlice' // Controlla che il path sia corretto
import { useState, useEffect } from 'react'
import TogglePlayerButton from '../players/TogglePlayerButton'
import BottomPlayerDetails from '../players/BottomPlayerDetails'
import ArtistTrackListCard from '../players/ArtistTrackListCard'
import { setArtist, setPlatform } from '../../store/playerSlice'
import SocialLinks from '../artists/SocialLinks'
import defaultArtistRV from '../../../public/data/defaultArtist' // adatta il path alla posizione reale
import PlayerRenderer from '../players/PlayerRenderer'
import { addVisitedArtist } from '../../store/visitedArtistsSlice';
import CardStaticWrapper from './CardStaticWrapper'
import FiltersWrapper from './FiltersWrapper'
import SectionTitle from './SectionTitle'
import { Link } from 'react-router-dom'
import ArtistOverlayCard from '../players/ArtistOverlayCard'


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
  const bgImage = activeArtist.images?.[0] || 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg'

  // Handler per selezione di un artista
  const handleSelect = (item) => {
    dispatch(setArtist(item))
    dispatch(setPlatform(item.defaultPlatform))
    dispatch(setAutoPlay(true))
  }

  // Ottieni URL del singolo per la piattaforma selezionata
  const singles = activeArtist?.singles || []
  const firstSingle = singles.length > 0 ? singles[0] : null
  const url = firstSingle?.platforms?.[selectedPlatform] || ''

  return (
    <div className=''>
      <div
        className={`w-80 sm:w-fit
    fixed bottom-8  min-w-[300px] md:min-w-[400px]	right-6 
    sm:right-8  md:right-16
    px-4 py-2 md:bottom-10 
    bg-monza text-black shadow-[8px_8px_0px_#000] 
    border-[3px] border-black z-40 
    transition-all duration-300 ease-in-out
    ${playerOpen ? 'h-fit md:h-[180px] lg:h-[180px] pt-12 ' : 'h-[60px] py-1 px-4  right-32  '}
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

        {/* Wrapper principale flex row */}
        <div className="flex flex-row items-start  md:items-center gap-4 w-full ">

          {/* Info artista + player + lista tracce */}
          <div className="flex flex-col md:flex-row gap-1 md:gap-4 flex-grow transition-all ">
            {/* Informazioni artista */}
            {playerOpen ? (
              <div className="relative flex flex-col items-start gap-2 ">
                <CardStaticWrapper>
                  <BottomPlayerDetails
                    activeArtist={activeArtist}
                    selectedPlatform={
                      selectedPlatform
                        ? selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
                        : ''
                    }
                    setSelectedPlatform={setSelectedPlatform}
                  />
                </CardStaticWrapper>
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



            {/* Contenitore del player musicale */}
            <div
              key={playerKey}
              className={`relative p-4 md:p-8 sm:mr-8 pt-2 sm:m-0 transition-all duration-300 ease-in-out flex-shrink-0
              ${playerOpen
                  ? 'opacity-100 scale-100 h-48 md:h-72 w-80 sm:w-[400px]'
                  : 'opacity-0 scale-95 h-0 pointer-events-none'}`}
            >
              <PlayerRenderer
                platform={selectedPlatform}
                url={url}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </div>




            {playerOpen ? (
              <div className=" block sm:hidden md:hidden xl:block "
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

            <div className='hidden mb-12 lg:block'>
              <SectionTitle>
                <Link to="/">
                  <div className='font-arvo text-xl text-monza '>
                    RARE VIBES
                  </div>
                </Link>
              </SectionTitle> </div>
            : <> </>}

        </div>

        <div className="fixed right-16 mt-1 bottom-1 hidden xl:block z-50"
        ><FiltersWrapper>
            <SocialLinks socials={{
              instagram: "https://instagram.com/smallenginetechnician",
              twitter: "https://twitter.com/smallenginetechnician"
            }} /> </FiltersWrapper>
        </div>

        {/* Bottone per aprire/chiudere il player */}
        <div className="absolute bottom-1 right-2 ">
          <TogglePlayerButton playerOpen={playerOpen} onClick={toggleOpen} />
        </div>
      </div>
    </div >
  )
}
