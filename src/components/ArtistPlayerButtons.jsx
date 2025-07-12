import { useDispatch } from 'react-redux'
import { setArtist, setPlatform } from '../store/playerSlice'

export default function ArtistPlayerButtons({ artist }) {
  const dispatch = useDispatch()

  const handlePlay = (platform) => {
    dispatch(setArtist(artist))
    dispatch(setPlatform(platform))
  }

  return (
    <div className="flex gap-4 mt-6 flex-wrap">
      {artist.spotify && (
        <button onClick={() => handlePlay('spotify')} className="btn-monza">
          ▶️ Spotify
        </button>
      )}
      {artist.soundcloud && (
        <button onClick={() => handlePlay('soundcloud')} className="btn-monza">
          ▶️ SoundCloud
        </button>
      )}
      {artist.youtube && (
        <button onClick={() => handlePlay('youtube')} className="btn-monza">
          ▶️ YouTube
        </button>
      )}
    </div>
  )
}
