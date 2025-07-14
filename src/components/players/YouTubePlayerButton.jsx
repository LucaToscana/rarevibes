import React, { useState } from 'react'

export default function YouTubePlayerButton() {
  const [showPlayer, setShowPlayer] = useState(false)

  const videoId = "dQw4w9WgXcQ" // esempio video YouTube

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <button
        onClick={() => setShowPlayer(true)}
        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Avvia Player YouTube
      </button>

      {showPlayer && (
        <iframe
          width="300"
          height="170"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  )
}
