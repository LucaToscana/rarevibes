import React, { useState, useEffect } from 'react'
import ArtistCard from '../components/artists/ArtistCard'
import { useTranslation } from 'react-i18next'
import musicFilters from '../locales/en/musicFilters.json';
import { useSelector, useDispatch } from 'react-redux'
import FiltersConsole from '../components/artists/FiltersConsole';

export default function Artists() {
  const [artists, setArtists] = useState([])

  const mainFilter = useSelector(state => state.filters.mainFilter)
  const subFilter = useSelector(state => state.filters.subFilter)
  const dispatch = useDispatch()

  const { t } = useTranslation('common') // namespace

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/artists.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(data => setArtists(data))
      .catch(err => console.error('Errore nel caricamento artisti:', err))
  }, [])
  // Estraggo i generi dal JSON (escludendo 'title')
  const genres = Object.entries(musicFilters)
    .filter(([key]) => key !== 'title')
    .map(([key, label]) => ({ key, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
  // Filtro artisti principale e secondario
  const filteredArtists = artists.filter(artist => {
    if (mainFilter === 'all') return true
    if (mainFilter === 'artist') return artist.type === 'artist'
    if (mainFilter === 'musician') {
      if (subFilter === 'all') return artist.type === 'musician'
      return artist.genre === subFilter
    }
    return false
  })

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto ">

      <div className="artist-monoton mb-8 mt-10">{t('artists')}</div>
      <div className="h-1 bg-monza mb-16" />
      {/* Container filtri principali */}
      <FiltersConsole genres={genres} />


      {/* Lista artisti filtrata */}
      <div className="grid gap-8 md:grid-cols-3">
        {filteredArtists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} showBio slug={artist.id} />
        ))}
      </div>

    </main>
  )
}
