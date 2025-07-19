import musicFilters from "../locales/en/musicFilters.json";
import artFilters from "../locales/en/artFilters.json"; // Ensure this path is correct

// Assuming you have your full dataset for all artists and musicians
// You'll need to replace these with your actual data sources (e.g., fetched data, imported JSONs)
// For demonstration, I'm defining them as empty arrays.
const allArtistsData = []; // <--- Populate with your full visual artist data

import { useTranslation } from "react-i18next";
import FiltersConsole from "../components/artists/FiltersConsole";
import ArtistCard from "../components/artists/ArtistCard";
import SubFilterList from "../components/layout/SubFilterList";
import FilterHeader from "../components/layout/FilterHeader";
import { useFilteredArtists, useFilterManagement } from "../hook/useFilters";
import { useEffect, useRef, useState, useMemo } from "react"; // Added useMemo
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const bgImage =
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg";

// --- Helper function to get most prevalent genres ---
// This function is defined outside the component to prevent re-creation on every render,
// unless it depends on props/state, in which case it should be wrapped in useCallback.
// Given it depends on global-like data (allArtistsData, allMusiciansData),
// defining it here is appropriate.
const getMostPrevalentGenres = () => {
  const genreCounts = {};

  // Process genres from art artists
  if (allArtistsData && allArtistsData.length > 0) {
    allArtistsData.forEach(artist => {
      (artist.genres || []).forEach(genre => {
        const lowerCaseGenre = genre.toLowerCase();
        genreCounts[lowerCaseGenre] = (genreCounts[lowerCaseGenre] || 0) + 1;
      });
    });
  }

  const sortedGenres = Object.keys(genreCounts).map(genre => ({
    name: genre,
    count: genreCounts[genre]
  }));

  sortedGenres.sort((a, b) => b.count - a.count);

  return sortedGenres.map(genre => genre.name);
};

export default function Artists() {
  const [isSubFilterListVisible, setIsSubFilterListVisible] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("0px");

  // Determine the *initial* filter data based on your desired default.
  // For 'all' as a default, you'd use getMostPrevalentGenres().
  // If 'music' or 'artist' is your initial default, adjust accordingly.
  // For robustness, let's default to 'all' if mainFilter is empty on first render.
  const initialFilterDataSet = useMemo(() => {
    // You might want to get the actual initial mainFilter from your hook
    // or define a clear default here for the very first render.
    // For this example, let's assume 'all' is the true default if nothing specific is chosen.
    return getMostPrevalentGenres();
  }, []); // Only compute once on initial render


  // This hook manages the main filter state (e.g., ['music'], ['artist'], or ['all'])
  // It should correctly expose `mainFilter`.
  // We pass the initially determined filter data set.
  const { handleReset, cleanedSubFilters, mainFilter } = useFilterManagement(
    initialFilterDataSet // Pass the initial set of genres
  );

  // --- Determine which filter data set to use for display ---
  // This is the core logic you wanted to update.
  const currentFilterData = useMemo(() => {
    if (mainFilter.includes('artist')) {
      return artFilters.genres || [];
    } else if (mainFilter.includes('musician')) {
      return musicFilters.genres || [];
    } else {
      // If neither 'artist' nor 'musician' is explicitly selected in mainFilter,
      // it implies the 'all' state.
      return getMostPrevalentGenres();
    }
  }, [mainFilter]); // Recalculate only when mainFilter changes


  const { filteredArtists } = useFilteredArtists(); // This hook should use the `mainFilter` and other sub-filters to filter artists.

  useEffect(() => {
    if (isSubFilterListVisible) {
      if (contentRef.current) {
        setContentHeight(`${contentRef.current.scrollHeight}px`);
      }
    } else {
      if (contentRef.current) {
        // Capture scrollHeight before setting to 0 for smooth collapse
        const currentScrollHeight = contentRef.current.scrollHeight;
        setContentHeight(`${currentScrollHeight}px`);
        setTimeout(() => {
          setContentHeight("0px");
        }, 10); // Small delay to allow transition to start from full height
      }
    }
  }, [isSubFilterListVisible]);

  const { t } = useTranslation("common");

  const toggleSubFilterListVisibility = () => {
    setIsSubFilterListVisible((prev) => !prev);
  };

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto">
      <div>
        {/* Header section with Artists title and FilterHeader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4">
          <h1 className="artist-monoton text-2xl sm:text-3xl lg:text-6xl">
            {t("artists")}
          </h1>

          <div className="flex items-center gap-4">
            <FilterHeader
              count={
                cleanedSubFilters.length +
                // Adjusted logic for filter count: if 'all' is the only mainFilter,
                // it shouldn't count as an active filter in the header,
                // as it's the default state. Otherwise, count mainFilter items.
                (mainFilter.includes('all') && mainFilter.length === 1 ? 0 : mainFilter.length)
              }
              onReset={handleReset}
            />

            {/* The Collapse/Expand button */}
            <button
              onClick={toggleSubFilterListVisibility}
              className="focus:outline-none active:outline-none focus:ring-0 active:ring-0 focus:border-transparent active:border-transparent !border-none rounded-full p-2"
              aria-label={
                isSubFilterListVisible ? t("hide_filters") : t("show_filters")
              }
            >
              {isSubFilterListVisible ? (
                <FaChevronUp
                  className="h-5 w-5 bg-monza text-iron rounded-full"
                  aria-hidden="true"
                />
              ) : (
                <FaChevronDown
                  className="h-5 w-5 bg-iron text-monza rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        <div
          ref={contentRef}
          // The maxHeight transition needs to be precise for smooth animation
          style={{ maxHeight: isSubFilterListVisible ? contentHeight : "0px" }}
          className={`
            overflow-hidden
            transition-[max-height] duration-300 ease-in-out
            relative
            rounded-md
            ${isSubFilterListVisible ? "mt-4" : ""}
          `}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
            aria-hidden="true"
          />

          {/* Dark overlay for contrast */}
          <div
            className="absolute inset-0 bg-black bg-opacity-60"
            aria-hidden="true"
          />

          {/* Content that will appear above the image and overlay */}
          {isSubFilterListVisible && (
            <div
              className="relative z-10 p-4 w-full text-white custom-red-scrollbar"
              style={{
                // Ensure max-height for scrolling is correctly calculated based on contentRef.current.scrollHeight
                maxHeight: isSubFilterListVisible
                  ? `${contentRef.current ? contentRef.current.scrollHeight : 0}px`
                  : "0px",
                overflowY: "auto",
              }}
            >
              {/* Pass the currently active filter data to SubFilterList */}
              <SubFilterList genres={currentFilterData} />
            </div>
          )}
        </div>
      </div>

      <div className="h-1 bg-monza mb-8" />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left column: Filters */}
        <aside className="md:col-span-1">
          {/* Pass the currently active filter data to FiltersConsole */}
          <FiltersConsole genres={currentFilterData} />
        </aside>

        {/* Right column: Artist list */}
        <section className="md:col-span-3 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              showBio
              slug={artist.id}
            />
          ))}
        </section>
      </div>
    </main>
  );
}