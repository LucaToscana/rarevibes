import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function YouTubePlayer({ videoId }) {
  const autoplay = useSelector((state) => state.player.autoPlay)

  if (!videoId) return null

  useEffect(() => {
    // Carica lo script solo una volta
    const scriptId = 'lite-yt-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.src =
        'https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.1.3/src/lite-yt-embed.js'
      script.defer = true
      script.id = scriptId
      document.body.appendChild(script)
    }
  }, [])

  const previewImage = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  return (
    <>
      {/* Preload della thumbnail per migliorare LCP */}
      <link rel="preload" as="image" href={previewImage} />

      {/* Stili lite-youtube */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.1.3/src/lite-yt-embed.css"
      />

      <div className="youtube-wrapper">
        <lite-youtube
          videoid={videoId}
          title="YouTube video player"
          params={autoplay ? 'autoplay=1' : ''}
          style={{ backgroundImage: `url(${previewImage})` }}
        ></lite-youtube>
      </div>
    </>
  )
}
