import { useDispatch } from 'react-redux'
import { setArtist, setPlatform } from '../../store/playerSlice'
import { FaSpotify, FaSoundcloud, FaYoutube } from 'react-icons/fa'

export default function ArtistPlayerButtons({ artist }) {
  const dispatch = useDispatch()

  const handlePlay = (platform) => {
    dispatch(setArtist(artist))
    dispatch(setPlatform(platform))
  }

  const bgImage = artist.images?.[0] || 'https://placehold.co/400x300?text=No+Image'

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
      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Contenuto sopra overlay */}
      <div className="font-rubik relative p-6 flex flex-col justify-center h-full">
        <h2 className="text-2xl mb-4 drop-shadow-lg">
          Listen to {artist.name} on your favorite platform
        </h2>        <div className="flex flex-col gap-3">
          {artist.platforms?.spotify && (
            <button
              onClick={() => handlePlay('spotify')}
              className="btn-monza  w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md  hover:bg-monza-dark transition"
              aria-label={`Play ${artist.name} on Spotify`}
            >
              <FaSpotify size={20} />
              Spotify
            </button>
          )}
          {artist.platforms?.soundcloud && (
            <button
              onClick={() => handlePlay('soundcloud')}
              className="btn-monza w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md  hover:bg-monza-dark transition"
              aria-label={`Play ${artist.name} on SoundCloud`}
            >
              <FaSoundcloud size={20} />
              SoundCloud
            </button>
          )}
          {artist.platforms?.youtube && (
            <button
              onClick={() => handlePlay('youtube')}
              className="btn-monza w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md  hover:bg-monza-dark transition"
              aria-label={`Play ${artist.name} on YouTube`}
            >
              <FaYoutube size={20} />
              YouTube
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
