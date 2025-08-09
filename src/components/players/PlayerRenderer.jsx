// components/PlayerRenderer.jsx
import SpotifyPlayer from './SpotifyPlayer'
import SoundCloudPlayer from './SoundCloudPlayer'
import YouTubePlayer from './YouTubePlayer'
import BandcampPlayer from './BandcampPlayer'
import CardStaticWrapper from '../layout/CardStaticWrapper'
import { useTranslation } from 'react-i18next'

const PlayerRenderer = ({ platform, url, isPlaying, setIsPlaying }) => {
  if (!url) {
    const platformName = {
      spotify: 'spotify',
      soundcloud: 'soundCloud',
      youtube: 'youTube',
      bandcamp: 'bandcamp',
    }[platform] || 'selezionata'
    const { t } = useTranslation('common');

    return <CardStaticWrapper> <div className="p-2 text-center font-heming  text-sm "> {platformName} {t("error_platform_not_found")} </div> </CardStaticWrapper>
  }

  switch (platform) {
    case 'spotify':
      return (
        <CardStaticWrapper>

          <SpotifyPlayer
            url={url}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </CardStaticWrapper>
      )
    case 'soundcloud':
      return (
        <CardStaticWrapper>

          <SoundCloudPlayer
            url={url}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </CardStaticWrapper>

      )
    case 'youtube': {
      const videoId = url.includes('watch?v=') ? url.split('watch?v=')[1] : url
      return (
        <CardStaticWrapper>
          <YouTubePlayer
            videoId={videoId}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />            </CardStaticWrapper>

      )
    }
    case 'bandcamp': {

      return <CardStaticWrapper> <BandcampPlayer albumId={url} />        </CardStaticWrapper>

    }

    default:
      return <CardStaticWrapper> <div className="p-4 text-center">{t("error_platform_not_found")}</div>
      </CardStaticWrapper>
  }
}

export default PlayerRenderer
