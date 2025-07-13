import React, { useState, useEffect } from 'react'
import ArtistCard from '../components/artists/ArtistCard'
import FilterButton from '../components/layout/FilterButton'
import { useParams } from 'react-router-dom'

export default function Artists() {
  const [artists, setArtists] = useState([])
  const [filter, setFilter] = useState('all')
  const { slug } = useParams()

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/artists.json')
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
    <main className="min-h-screen   px-6 py-12  ">
      <h1 className="heading-monoton mb-6 text-center mt-8">Artists</h1>
      <div className="flex justify-center gap-4 mb-12">
        <FilterButton label="all" value="all" currentFilter={filter} onClick={setFilter} />
        <FilterButton label="visual arts" value="artist" currentFilter={filter} onClick={setFilter} />
        <FilterButton label="music" value="musician" currentFilter={filter} onClick={setFilter} />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {filteredArtists.map((artist) => (
          <ArtistCard  key={artist.name} artist={artist} showBio={true} slug={artist.id}/>
        ))}
      </div>

    </main>
  )
}
