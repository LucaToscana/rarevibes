import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import ArtistCard from '../components/ArtistCard'

export default function Artists() {
  const [artists, setArtists] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/data/artists.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(data => setArtists(data))
      .catch(err => console.error('Errore nel caricamento artisti:', err))
  }, [])

  const filteredArtists = artists.filter(artist => {
    if (filter === 'all') return true
    return artist.type === filter
  })

  return (
    <main className="min-h-screen   px-6 py-12 max-w-6xl mx-auto">
      <h1 className="font-arvo text-4xl font-bold mb-6 text-center">Tutti gli Artisti</h1>

      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setFilter('all')}
          className={`font-arvo  px-4 py-2 rounded ${filter === 'all' ? 'bg-monza text-black' : 'bg-monzadark text-iron'}`}
        >
          Tutti
        </button>
        <button
          onClick={() => setFilter('artist')}
          className={`font-arvo  px-4 py-2 rounded ${filter === 'artist' ? 'bg-monza text-black' : 'bg-monzadark text-iron'}`}
        >
          Arti Visive
        </button>
        <button
          onClick={() => setFilter('musician')}
          className={`font-arvo  px-4 py-2 rounded ${filter === 'musician' ? 'bg-monza text-black' : 'bg-monzadark text-iron'}`}
        >
          Musica
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {filteredArtists.map((artist) => (
          <ArtistCard artist={artist} showBio={true} />
        ))}
      </div>

    </main>
  )
}
