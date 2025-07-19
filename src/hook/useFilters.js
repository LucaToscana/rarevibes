import { useSelector, useDispatch } from "react-redux";
import { setMainFilter, setSubFilter } from "../store/filtersSlice";
import { useState, useEffect, useMemo, useCallback } from "react";

/**
 * Custom hook for fetching and filtering artists based on Redux state.
 * @returns {object} An object containing filteredArtists and the reset function.
 */
export function useFilteredArtists() {
  const [artists, setArtists] = useState([]);
  const mainFilters = useSelector((state) => state.filters.mainFilter);
  const subFilters = useSelector((state) => state.filters.subFilter);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch(import.meta.env.BASE_URL + "data/artists.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setArtists(data))
      .catch((err) => console.error("Error loading artists:", err));
  }, []);

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
  // THIS IS THE LINE (OR SIMILAR) THAT CAUSES THE ERROR
    // if (mainFilters.isEmpty()) { // <-- Problematic line
    //   return true;
    // }

    // Corrected logic:
    if (mainFilters.length === 0 || (mainFilters.length === 1 && mainFilters[0] === 'all')) {
      return true; // If no filters or 'all' filter, show all artists
    }
      // Filter by 'artist' type
      if (mainFilters.includes("artist")) {
        return artist.type === "artist";
      }

      // Filter by 'musician' type and sub-genres
      if (mainFilters.includes("musician")) {
        // If no subFilters are selected, show all musicians
        if (subFilters.length === 0) {
          return artist.type === "musician";
        }
        // Otherwise, filter by sub-genres
        return (
          artist.type === "musician" &&
          artist.genres.some((g) => subFilters.includes(g))
        );
      }

      return false;
    });
  }, [artists, mainFilters, subFilters]); // Recalculate only when dependencies change

  return { filteredArtists };
}

/**
 * Custom hook for managing main and sub-filters.
 * @param {Array} genres - The list of main genres with subgenres.
 * @returns {object} An object containing filter states and toggle functions.
 */
export function useFilterManagement(genres) {
  const dispatch = useDispatch();
  const mainFilter = useSelector((state) => state.filters.mainFilter);
  const subFilters = useSelector((state) => state.filters.subFilter);
  const mainGenres = useSelector((state) => state.filters.mainGenres);

  const [expandedGenres, setExpandedGenres] = useState({});

  const handleReset = useCallback(() => {
    dispatch(setMainFilter(["all"])); // Set mainFilter to 'all'
    dispatch(setSubFilter([])); // Clear subFilters
  }, [dispatch]);

  const toggleExpand = useCallback((key) => {
    setExpandedGenres((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const toggleSubFilter = useCallback(
    (key) => {
      dispatch(
        setSubFilter(
          subFilters.includes(key)
            ? subFilters.filter((f) => f !== key) // Remove filter
            : [...subFilters, key] // Add filter
        )
      );
    },
    [dispatch, subFilters]
  );

  const toggleMainGenre = useCallback(
    (genre) => {
      const genreKeys = [
        genre.key,
        ...(genre.subgenres?.map((s) => s.key) || []),
      ];
      const allSelected = genreKeys.every((key) => subFilters.includes(key));

      if (allSelected) {
        // If all are selected, remove them all
        dispatch(
          setSubFilter(subFilters.filter((f) => !genreKeys.includes(f)))
        );
      } else {
        // Otherwise, add missing ones
        const newFilters = [...new Set([...subFilters, ...genreKeys])];
        dispatch(setSubFilter(newFilters));
      }
    },
    [dispatch, subFilters]
  );

  const isMainGenreSelected = useCallback(
    (genre) => {
      const genreKeys = genre.subgenres?.map((s) => s.key) || [];
      return genreKeys.every((key) => subFilters.includes(key));
    },
    [subFilters]
  );

  const cleanedSubFilters = useMemo(() => {
    return subFilters.filter((key) => !mainGenres.includes(key));
  }, [subFilters, mainGenres]);

  return {
    mainFilter,
    subFilters,
    expandedGenres,
    cleanedSubFilters,
    handleReset,
    toggleExpand,
    toggleSubFilter,
    toggleMainGenre,
    isMainGenreSelected,
    dispatchMainFilter: (filter) => dispatch(setMainFilter(filter)), // Expose a direct dispatch for main filter
  };
}
