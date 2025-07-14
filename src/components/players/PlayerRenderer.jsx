// components/PlayerRenderer.jsx
import SpotifyPlayer from './SpotifyPlayer'
import SoundCloudPlayer from './SoundCloudPlayer'
import YouTubePlayer from './YouTubePlayer'
import BandcampPlayer from './BandcampPlayer'

const PlayerRenderer = ({ platform, url, isPlaying, setIsPlaying }) => {
  if (!url) {
    const platformName = {
      spotify: 'spotify',
      soundcloud: 'soundCloud',
      youtube: 'youTube',
      bandcamp: 'bandcamp',
    }[platform] || 'selezionata'

    return <div className="p-4 text-center">Nessun link {platformName} disponibile</div>
  }

  switch (platform) {
    case 'spotify':
      return (
        <SpotifyPlayer
          url={url}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )
    case 'soundcloud':
      return (
        <SoundCloudPlayer
          url={url}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )
    case 'youtube': {
      const videoId = url.includes('watch?v=') ? url.split('watch?v=')[1] : url
      return (
        <YouTubePlayer
          videoId={videoId}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )
    }
    case 'bandcamp': {

      return <BandcampPlayer albumId={url} />
    }

    default:
      return <div className="p-4 text-center">Piattaforma non supportata</div>
  }
}

export default PlayerRenderer
