import { useDispatch } from 'react-redux'
import { setArtist, setPlatform, setAutoPlay, setPlayerOpen } from '../../store/playerSlice'
import { FaSpotify, FaSoundcloud, FaYoutube } from 'react-icons/fa'
import { SiSoundcloud, SiYoutube, SiBandcamp } from 'react-icons/si'
import { useTranslation } from 'react-i18next';

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
      className="max-w-md mx-auto rounded-lg shadow-md overflow-hidden border border-gray-200 relative text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '280px',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className=" relative p-6 flex flex-col justify-center h-full">
        <h2 className="text-2xl mb-4 drop-shadow-lg">
          {t('listenTo')} <span className="bio-highlight">{artist.name}</span> {t('onYourFavoritePlatform')}

        </h2>
        <div className="flex flex-col gap-3">
          {platforms.map(({ key, icon: Icon, label }) =>
            artist.platforms?.[key] ? (
              <button
                key={key}
                onClick={() => handlePlay(key)}
                className="btn-monza w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md hover:bg-monza-dark transition"
                aria-label={`Play ${artist.name} on ${label}`}
              >
                <Icon size={20} />
                {label}
              </button>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}
