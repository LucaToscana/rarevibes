import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FilterButton from './FilterButton';
import { setSubFilter, setMainFilter } from '../../store/filtersSlice'; // ← assicurati di importare correttamente

export default function SubFilterList() {
  const dispatch = useDispatch();
  const mainGenres = useSelector(state => state.filters.mainGenres)
  // Leggi i subFilter dallo store
  const subFilters = useSelector(state => state.filters.subFilter) || [];
  const mainFilter = useSelector(state => state.filters.mainFilter) || [];
  // Stato per gestire il tremolio temporaneo
  const [shakingFilters, setShakingFilters] = useState([]);


  const handleClick = (key) => {
    if (shakingFilters.includes(key)) {
      // Secondo click → rimuovi filtro
      const updatedFilters = subFilters.filter(f => f !== key);
      dispatch(setSubFilter(updatedFilters));
      if (subFilters.length === 0) {
        dispatch(setMainFilter(['all']));
      }
      setShakingFilters(prev => prev.filter(f => f !== key));
    } else {
      // Primo click → attiva tremolio
      setShakingFilters(prev => [...prev, key]);
      setTimeout(() => {
        setShakingFilters(prev => prev.filter(f => f !== key));
      }, 1000); // durata animazione in ms
    }
  };
  // Gestione click filtro principale
  const handleMainFilterClick = (key) => {
    if (mainFilter === key) {
      // Se clicchi il filtro principale già attivo, lo disattivi
      dispatch(setMainFilter(null));
    } else {
      // Attiva nuovo filtro principale
      dispatch(setMainFilter(key));

    }
  };
  return (
   <div className="h-full w-full overflow-x-auto">
      <div className="flex flex-wrap gap-1 w-full  ">

        {/* Bottoni Main Filter */}
        <div className="">
          {mainFilter.filter(key => !mainGenres.includes(key)).map((key) => (
            <FilterButton
              key={key}
              label={key}
              value={key}
              currentFilter={mainFilter === key ? key : ""}
              onClick={() => handleMainFilterClick(key)}
              custom={"filter-button"}
            />
          ))}
        </div>
        {subFilters
          .filter(key => !mainGenres.includes(key)) // escludi quelli in mainGenres
          .map(key => (
            <FilterButton
              key={key}
              label={key}
              value={key}
              currentFilter={shakingFilters.includes(key) ? key : ""}
              onClick={() => handleClick(key)}
              custom={'filter-button'}
            />
          ))
        }
      </div>
    </div >
  );
}
