import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { setPlayerOpen, setAutoPlay, setArtist, setPlatform } from '../../store/playerSlice'
import { addVisitedArtist } from '../../store/visitedArtistsSlice'

import TogglePlayerButton from '../players/TogglePlayerButton'
import BottomPlayerDetails from '../players/BottomPlayerDetails'
import ArtistTrackListCard from '../players/ArtistTrackListCard'
import SocialLinks from '../artists/SocialLinks'
import CardStaticWrapper from './CardStaticWrapper'
import FiltersWrapper from './FiltersWrapper'
import SectionTitle from './SectionTitle'
import ArtistOverlayCard from '../players/ArtistOverlayCard'
import PlayerRenderer from '../players/PlayerRenderer'

import { Link } from 'react-router-dom'
import defaultArtistRV from '../../../public/data/defaultArtist'
import data from '../../data/defaultData'

export default function BottomPlayer() {
  const dispatch = useDispatch()
  const { artist, platform, playerOpen } = useSelector((state) => state.player)

  const [playerKey, setPlayerKey] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState(platform)
  const [trackList, setTrackList] = useState([])

  const defaultArtist = defaultArtistRV
  const activeArtist = artist || defaultArtist
  const activePlatform = platform || 'youtube'

  const singles = activeArtist?.singles || []
  const firstSingle = singles.length > 0 ? singles[0] : null
  const url = firstSingle?.platforms?.[selectedPlatform] || ''
  const bgImage = activeArtist.images?.[0] || data.heroImagesDefault[0]

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/artists.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(data => setTrackList(data.slice(0, 5)))
      .catch(err => console.error('Errore nel caricamento artisti:', err))
  }, [])

  useEffect(() => {
    setPlayerKey(prev => prev + 1)
  }, [artist, platform])

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
      dispatch(addVisitedArtist(activeArtist))
    }
  }, [activeArtist, dispatch])

  const toggleOpen = () => dispatch(setPlayerOpen(!playerOpen))

  const handleSelect = (item) => {
    const platform = item.defaultPlatform || 'youtube'
    dispatch(setArtist(item))
    dispatch(setPlatform(platform))
    dispatch(setAutoPlay(true))
  }

  if (!activeArtist || !activePlatform) return null

  return (
    <div
      className={`fixed bottom-8 right-6 w-[calc(100vw-3rem)] max-w-sm sm:max-w-fit md:max-w-fit lg:max-w-xl xl:max-w-5xl min-w-[300px] 
      px-4 py-2 md:bottom-10 md:right-8 lg:right-16
      bg-monza text-black shadow-[8px_8px_0px_#000]
      border-[3px] border-black z-40
      transition-all duration-300 ease-in-out
      ${playerOpen ? 'h-fit' : 'h-[60px] py-1 px-4'}
      flex items-center justify-between
      rotate-[-2deg] hover:rotate-0`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Content Wrapper */}
      <div className="flex w-full items-start gap-4 md:items-center">
        <div className="flex flex-grow flex-col gap-4 transition-all xl:flex-row">
          {playerOpen ? (
            <div className="flex flex-col items-start gap-1">
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

              {/* Track List */}
              {playerOpen && (
                <div className="hidden lg:block pt-4">
                  <ArtistTrackListCard
                    title="recents"
                    items={trackList}
                    onSelect={handleSelect}
                    selectArtist={artist}
                  />
                </div>
              )}

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

          {/* Always Mounted Player */}
          <div
            className={`relative flex-shrink-0 transition-all duration-300 ease-in-out
                ${playerOpen
                ? 'w-80 lg:pt-8 lg:px-4 scale-100 opacity-100 sm:w-[300px] lg:w-[400px]'
                : 'h-0 overflow-hidden scale-95 opacity-0 pointer-events-none'
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

        </div>

        {/* Logo + Socials */}
        {playerOpen && (
          <div className="absolute bottom-2 right-2 hidden lg:flex lg:flex-col lg:items-end">
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
  )
}
