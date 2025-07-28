import { useDispatch } from 'react-redux'
import { setArtist, setPlatform, setAutoPlay, setPlayerOpen } from '../../store/playerSlice'
import { FaSpotify, FaSoundcloud, FaYoutube } from 'react-icons/fa'
import { SiSoundcloud, SiYoutube, SiBandcamp } from 'react-icons/si'
import { useTranslation } from 'react-i18next';
import ArtistTags from '../artists/ArtistTags';
import FiltersWrapper from '../layout/filtersWrapper';

export default function ArtistPlayerButtons({ artist }) {
  const dispatch = useDispatch()
  const { t } = useTranslation('common');

  const handlePlay = (platform) => {
    dispatch(setArtist(artist))
    dispatch(setPlatform(platform))
    dispatch(setAutoPlay(true))
    dispatch(setPlayerOpen(true))
  }

  const bgImage = artist.images?.[0] || 'https://placehold.co/400x300?text=No+Image'

  const platforms = [
    { key: 'spotify', icon: FaSpotify, label: 'Spotify' },
    { key: 'soundcloud', icon: FaSoundcloud, label: 'SoundCloud' },
    { key: 'youtube', icon: FaYoutube, label: 'YouTube' },
    { key: 'bandcamp', icon: SiBandcamp, label: 'BandCamp' },

  ]

  return (
    <div
      className="max-w-md rounded-lg shadow-md overflow-hidden border border-gray-200 relative text-white max-h-16"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '8px',
      }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-60" />
      <div className="flex flex-col items-center gap-2">


      </div>
      <div className="relative h-full">
        <div className="flex w-full gap-2 ">
          {platforms.map(({ key, icon: Icon, label }) =>
            artist.platforms?.[key] ? (
                        <FiltersWrapper>

              <button
                key={key}
                onClick={() => handlePlay(key)}
                className="flex-1 basis-0 flex items-center justify-center rounded-md transition text-monza min-h-[40px]"
                aria-label={`Play ${artist.name} on ${label}`}
              >
                <Icon
                  size={28}
                  className="w-7 h-7 hover:text-monza transition-colors hover:text-monzadark"
                />
              </button>  </FiltersWrapper>
            ) : null
          )}
        </div>
      </div>

    </div>
  )
}
