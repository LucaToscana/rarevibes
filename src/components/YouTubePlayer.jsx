import React, { useEffect, useRef, useState } from 'react'

export default function YouTubePlayer({ videoId }) {
  const playerRef = useRef(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!window.YT) {
      // aspetta che YT API sia caricata
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        videoId,
        events: {
          onError: () => setError(true),
        },
      })
    }
  }, [videoId])

  if (error) return null // non mostra nulla se errore

  return <div id="yt-player" />
}
