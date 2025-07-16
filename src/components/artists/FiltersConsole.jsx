import { useSelector, useDispatch } from 'react-redux'
import { setMainFilter, setSubFilter } from '../../store/filtersSlice'
import { useTranslation } from 'react-i18next'
import FilterButton from '../layout/FilterButton'
export default function FiltersConsole({ genres }) {
  const mainFilter = useSelector(state => state.filters.mainFilter)
  const subFilter = useSelector(state => state.filters.subFilter)
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  return (
    <>
      {/* Container filtri principali */}
      <div className="mb-6 overflow-x-auto no-scrollbar ">
        <div className="flex gap-4 px-4 min-w-max ">
          <FilterButton
            key="all"
            label={t('filters.all', 'All')}
            value="all"
            currentFilter={mainFilter}
            onClick={() => dispatch(setMainFilter('all'))}
          />
          <FilterButton
            label={t('filters.visualArts', 'Visual Arts')}
            value="artist"
            currentFilter={mainFilter}
            onClick={() => dispatch(setMainFilter('artist'))}
          />
          <FilterButton
            label={t('filters.music', 'Music')}
            value="musician"
            currentFilter={mainFilter}
            onClick={() => dispatch(setMainFilter('musician'))}
          />
        </div>
      </div>

      {/* Filtri secondari (generi musicali) */}
      {mainFilter === 'musician' && (
        <div className="mb-8 overflow-x-auto no-scrollbar pb-4">
          <div className="flex gap-3 px-4 min-w-max">
            {genres.map(({ key, label }) => (
              <FilterButton
                key={key}
                label={label}
                value={key}
                currentFilter={subFilter}
                onClick={() => dispatch(setSubFilter(key))}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
