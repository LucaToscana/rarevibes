import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilterButton from '../layout/FilterButton';
import { useFilterManagement } from '../../hook/useFilters';
import { FiFilter, FiX } from 'react-icons/fi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import FiltersWrapper from '../layout/filtersWrapper';

export default function FiltersConsole({ genres }) {
  const {
    mainFilter,
    subFilters,
    expandedGenres,
    toggleExpand,
    toggleSubFilter,
    toggleMainGenre,
    isMainGenreSelected,
    dispatchMainFilter
  } = useFilterManagement(genres);

  const { t } = useTranslation(['musicFilters', 'artFilters']);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>

      {/* Main filters + Mobile toggle icon (in one line) */}
      <div className="mb-6  ">
        <div className="flex items-center gap-4 px-4 min-w-max">
          <FilterButton
            key={"musician"}
            label={"musician"}
            value="musician"
            currentFilter={mainFilter.includes('musician') ? 'musician' : ''}
            onClick={() => dispatchMainFilter(['musician'])}
          />
          <FilterButton
            key={"artist"}
            label={"artist"}
            value="artist"
            currentFilter={mainFilter.includes('artist') ? 'artist' : ''}
            onClick={() => dispatchMainFilter(['artist'])}
          />
          <FilterButton
            key={"all"}
            label={"all"}
            value="all"
            currentFilter={mainFilter.includes('all') ? 'all' : ''}
            onClick={() => dispatchMainFilter(['all'])}
          />

          {/* Mobile toggle button reusing expand/collapse style */}

          <button
            aria-label={showFilters ? t('hideFilters', 'Hide Filters') : t('showFilters', 'Show Filters')}
            onClick={() => setShowFilters(prev => !prev)}
            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded md:hidden"
            style={{ fontSize: '1.2rem', lineHeight: 1 }}
          >
            {showFilters ?

              <FiltersWrapper>
                <FaChevronUp
                  className="h-5 w-5 text-monza  rounded-full"
                  aria-hidden="true"
                /></FiltersWrapper>
              : <FiltersWrapper>
                <FaChevronDown
                  className="h-5 w-5 text-monza rounded-full"
                  aria-hidden="true"
                />
              </FiltersWrapper>
            }
          </button>
        </div>
      </div>



      {/* Genre filters */}
      {genres.length > 0 && (
        <div className="flex">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-48 min-w-[200px] p-4 ">
            {renderGenreFilters()}
          </aside>

          {/* Mobile collapsible filters */}
          {showFilters && (
            <aside className="block md:hidden w-full px-4">
              {renderGenreFilters(true)}
            </aside>
          )}
        </div>
      )}
    </>
  );

  // Function to render genre + subgenre filters
  function renderGenreFilters(isMobile = false) {
    return (
      <div
        className={`${isMobile
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
          : 'flex flex-col gap-3'
          }`}
        style={
          isMobile
            ? {
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            }
            : undefined
        }
      >
        {genres.map((genre) => {
          const isExpanded = expandedGenres[genre.key];
          const mainSelected = isMainGenreSelected(genre);

          return (
            <div key={genre.key}>
              <div className="flex items-center justify-between">
                <FilterButton
                  key={genre.key}
                  label={genre.label}
                  value={genre.key}
                  currentFilter={mainSelected ? genre.key : ""}
                  onClick={() => toggleMainGenre(genre)}
                />
                {genre.subgenres?.length > 0 && (
                  <button
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    onClick={() => toggleExpand(genre.key)}
                    className="ml-2  text-monza hover:text-monzadark focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                    style={{ fontSize: '1.2rem', lineHeight: 1 }}
                  >
                    <FiltersWrapper>
                      {isExpanded ? '▾' : '▸'}
                    </FiltersWrapper>
                  </button>
                )}
              </div>

              {isExpanded && genre.subgenres && (
                <div className="ml-6 mt-2 flex flex-col gap-1">
                  {genre.subgenres.map((sub) => (
                    <FilterButton
                      key={sub.key}
                      label={sub.label}
                      value={sub.key}
                      currentFilter={subFilters.includes(sub.key) ? sub.key : ""}
                      onClick={() => toggleSubFilter(sub.key)}

                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
