import { useTranslation } from 'react-i18next';
import FilterButton from '../layout/FilterButton';
import { useFilterManagement } from '../../hook/useFilters';

export default function FiltersConsole({ genres }) { // 'genres' will be either music genres or art genres
  const {
    mainFilter,
    subFilters,
    expandedGenres,
    toggleExpand,
    toggleSubFilter,
    toggleMainGenre,
    isMainGenreSelected,
    dispatchMainFilter
  } = useFilterManagement(genres); // The hook receives the currently active genre set

  const { t } = useTranslation('common');

  return (
    <>
      {/* Main filters (musician, artist) */}
      <div className="mb-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 px-4 min-w-max">
          <FilterButton
            label={"musician"}
            value="musician"
            // FilterButton uses `currentFilter` to decide if it's selected.
            // Ensure mainFilter is correctly managed (e.g., ['musician'] or ['artist'])
            currentFilter={mainFilter.includes('musician') ? 'musician' : ''}
            onClick={() => dispatchMainFilter(['musician'])}
          />

          <FilterButton
            label={"artist"}
            value="artist"
            currentFilter={mainFilter.includes('artist') ? 'artist' : ''}
            onClick={() => dispatchMainFilter(['artist'])}
          />

          {/* Optional: Add an "All" button for main filters if you want a global reset */}
          <FilterButton
            label={"all"}
            value="all"
            currentFilter={mainFilter.includes('all') ? 'all' : ''}
            onClick={() => dispatchMainFilter(['all'])}
          />
        </div>
      </div>

      {/* Sidebar for genres (dynamically displays music or art genres) */}
      {/* This section now renders based on the 'genres' prop itself */}
      {/* Added a check for genres.length to prevent rendering an empty sidebar */}
      {genres.length > 0 && (
        <div className="flex">
          <aside className="w-48 min-w-[200px] p-4 border-r border-gray-200">
            <div className="flex flex-col gap-3">
              {genres.map(genre => {
                const isExpanded = expandedGenres[genre.key];
                const mainSelected = isMainGenreSelected(genre);

                return (
                  <div key={genre.key}>
                    <div className="flex items-center justify-between">
                      <FilterButton
                        label={genre.label}
                        value={genre.key}
                        currentFilter={mainSelected ? genre.key : ""}
                        onClick={() => toggleMainGenre(genre)}
                      />
                      {genre.subgenres?.length > 0 && (
                        <button
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          onClick={() => toggleExpand(genre.key)}
                          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
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
                            onClick={() => toggleSubFilter(sub.key)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}