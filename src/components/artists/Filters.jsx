import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Filters() {
  const { t } = useTranslation('filters')
  const [mainFilter, setMainFilter] = useState('all')
  const [subFilter, setSubFilter] = useState('all')

  // Prendi i filtri principali (all, artist, music)
  const filters = {
    all: t('all', 'All'),
    artist: t('artist', 'Visual Arts'),
    music: t('music.title', 'Music'),
  }

  // Prendi sotto-filtri di music
  const musicFilters = t('music', { returnObjects: true })

  const handleMainClick = (key) => {
    setMainFilter(key)
    setSubFilter('all') // reset sottofiltro quando cambio principale
  }

  return (
    <>
      <div className="flex gap-4 justify-center mb-6">
        {Object.entries(filters).map(([key, label]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded ${mainFilter === key ? 'bg-monza text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleMainClick(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {mainFilter === 'music' && (
        <div className="flex gap-3 justify-center mb-12 flex-wrap max-w-4xl mx-auto">
          <button
            className={`px-3 py-1 rounded font-semibold ${subFilter === 'all' ? 'bg-monza text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setSubFilter('all')}
          >
            {t('all', 'All')}
          </button>
          {Object.entries(musicFilters).map(([key, label]) => {
            if (key === 'title') return null // escludo il titolo
            return (
              <button
                key={key}
                className={`px-3 py-1 rounded font-semibold ${subFilter === key ? 'bg-monza text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setSubFilter(key)}
              >
                {label}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
