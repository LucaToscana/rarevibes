import { useSelector, useDispatch } from "react-redux";
import { setMainFilter, setSubFilter } from "../store/filtersSlice";
import { useState, useEffect, useMemo, useCallback } from "react";

export function useFilteredArtists() {
  const [artists, setArtists] = useState([]);
  const mainFilters = useSelector((state) => state.filters.mainFilter);
  const subFilters = useSelector((state) => state.filters.subFilter);

  useEffect(() => {
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
      const isAllSelected =
        mainFilters.length === 0 ||
        (mainFilters.length === 1 && mainFilters[0] === "all");

      // Se è selezionato "all" e ci sono subfiltri, filtriamo comunque
      if (isAllSelected) {
        if (subFilters.length === 0) return true;
        return artist.genres.some((g) => subFilters.includes(g));
      }

      if (mainFilters.includes("visualarts") || mainFilters.includes("music")) {
        if (subFilters.length === 0) {
          // artista ha almeno uno dei tipi selezionati
          return artist.type.some((type) => mainFilters.includes(type));
        }
        return (
          artist.type.some((type) => mainFilters.includes(type)) &&
          artist.genres.some((g) => subFilters.includes(g))
        );
      }

      return false;
    });
  }, [artists, mainFilters, subFilters]);

  return { filteredArtists };
}

export function useFilterManagement(genres) {
  const dispatch = useDispatch();
  const mainFilter = useSelector((state) => state.filters.mainFilter);
  const subFilters = useSelector((state) => state.filters.subFilter);
  const mainGenres = useSelector((state) => state.filters.mainGenres);
  const [expandedGenres, setExpandedGenres] = useState({});

  const handleReset = useCallback(() => {
    dispatch(setMainFilter(["all"]));
    dispatch(setSubFilter([]));
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
            ? subFilters.filter((f) => f !== key)
            : [...subFilters, key]
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
        dispatch(
          setSubFilter(subFilters.filter((f) => !genreKeys.includes(f)))
        );
      } else {
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
    dispatchMainFilter: (filter) => dispatch(setMainFilter(filter)),
  };
}
