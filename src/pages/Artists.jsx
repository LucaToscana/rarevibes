import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

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
          className={`font-arvo  px-4 py-2 rounded ${filter === 'all' ? 'bg-white text-black' : 'bg-zinc-700'}`}
        >
          Tutti
        </button>
        <button
          onClick={() => setFilter('artist')}
          className={`font-arvo  px-4 py-2 rounded ${filter === 'artist' ? 'bg-white text-black' : 'bg-zinc-700'}`}
        >
          Arti Visive
        </button>
        <button
          onClick={() => setFilter('musician')}
          className={`font-arvo  px-4 py-2 rounded ${filter === 'musician' ? 'bg-white text-black' : 'bg-zinc-700'}`}
        >
          Musica
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {filteredArtists.map((artist) => (
          <Link
            key={artist.name}
            to={`/artists/${artist.name.toLowerCase().replace(/\s/g, '-')}`}
            className="group overflow-hidden rounded-xl shadow-lg bg-zinc-900 hover:bg-zinc-800 transition"
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-4">
              <h2 className="font-arvo  text-2xl font-bold">{artist.name}</h2>
              <p className="font-roboto  mt-2 text-zinc-300">{artist.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
