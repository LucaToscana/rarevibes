import { useSelector, useDispatch } from 'react-redux'
import { setMainFilter, setSubFilter } from '../../store/filtersSlice'
import { useTranslation } from 'react-i18next'
import FilterButton from '../layout/FilterButton'
import { useState } from 'react'

export default function FiltersConsole({ genres }) {
  const mainFilter = useSelector(state => state.filters.mainFilter)
  const subFilters = useSelector(state => state.filters.subFilter) || ['all'] // ora array
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  // Stato per i pannelli espansi
  const [expandedGenres, setExpandedGenres] = useState({})

  const toggleExpand = (key) => {
    setExpandedGenres(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // Funzione per aggiungere o rimuovere un filtro dall'array
  const toggleFilter = (key) => {
    if (subFilters.includes(key)) {
      // rimuovi filtro
      dispatch(setSubFilter(subFilters.filter(f => f !== key)))
    } else {
      // aggiungi filtro
      dispatch(setSubFilter([...subFilters, key]))
    }
  }

  // Funzione per selezionare/deselezionare tutti i sottogeneri di un main genre
  const toggleMainGenre = (genre) => {
    const genreKeys = [genre.key, ...(genre.subgenres?.map(s => s.key) || ['all'])]
    const allSelected = genreKeys.every(key => subFilters.includes(key))

    if (allSelected) {
      // se tutti selezionati, rimuovili tutti
      dispatch(setSubFilter(subFilters.filter(f => !genreKeys.includes(f))))
    } else {
      // altrimenti aggiungi quelli mancanti
      const newFilters = [...new Set([...subFilters, ...genreKeys])]
      dispatch(setSubFilter(newFilters))
    }
  }
  const areAllGenresSelected = (genre) => {
    const genreKeys = [genre.key, ...(genre.subgenres?.map(s => s.key) || ['all'])]
    const allSelected = genreKeys.every(key => subFilters.includes(key))
    if (allSelected) {
      return genre.key
    }
    return false
  };




  return (
    <>
      {/* Filtri principali */}
      <div className="mb-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 px-4 min-w-max">

          <FilterButton
            label={"artist"}
            value="artist"
            currentFilter={mainFilter}
            onClick={() => dispatch(setMainFilter('artist'))}
          />
          <FilterButton
            label={"musician"}
            value="musician"
            currentFilter={mainFilter}
            onClick={() => dispatch(setMainFilter('musician'))}
          />
        </div>
      </div>

      {/* Sidebar generi musicali */}
      {mainFilter === 'musician' && (
        <div className="flex">
          <aside className="w-48 min-w-[200px] p-4 border-r border-gray-200">
            <div className="flex flex-col gap-3">
              {genres.map(genre => {
                const isExpanded = expandedGenres[genre.key]
                const mainSelected = areAllGenresSelected(genre)
                return (
                  <div key={genre.key}>
                    <div className="flex items-center justify-between">
                      <FilterButton
                        label={genre.label}
                        value={genre.key}
                        currentFilter={mainSelected ? genre.key : ""} // evidiaenz se selezionato (usa un array fittizio)
                        onClick={() => toggleMainGenre(genre)}
                      />
                      {genre.subgenres?.length > 0 && (
                        <button
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          onClick={() => toggleExpand(genre.key)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          style={{ fontSize: '1.2rem', lineHeight: 1 }}
                        >
                          {isExpanded ? '▾' : '▸'}
                        </button>
                      )}
                    </div>
                    {isExpanded && genre.subgenres && (
                      <div className="ml-6 mt-2 flex flex-col gap-1">
                        {genre.subgenres.map(sub => (
                          <FilterButton
                            key={sub.key}
                            label={sub.label}
                            value={sub.key}
                            currentFilter={subFilters.includes(sub.key) ? sub.key : ""}
                            onClick={() => toggleFilter(sub.key)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
