import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FilterButton from './FilterButton';
import { setSubFilter, setMainFilter } from '../../store/filtersSlice'; // ← assicurati di importare correttamente

export default function SubFilterList() {
  const dispatch = useDispatch();
  const mainGenres = useSelector(state => state.filters.mainGenres)
  // Leggi i subFilter dallo store
  const subFilters = useSelector(state => state.filters.subFilter) || [];

  // Stato per gestire il tremolio temporaneo
  const [shakingFilters, setShakingFilters] = useState([]);

  const handleClick = (key) => {
    if (shakingFilters.includes(key)) {
      // Secondo click → rimuovi filtro
      const updatedFilters = subFilters.filter(f => f !== key);
      dispatch(setSubFilter(updatedFilters));
      setShakingFilters(prev => prev.filter(f => f !== key));
    } else {
      // Primo click → attiva tremolio
      setShakingFilters(prev => [...prev, key]);
      setTimeout(() => {
        setShakingFilters(prev => prev.filter(f => f !== key));
      }, 1000); // durata animazione in ms
    }


  };

  return (
    <div className="h-24">
      <div className="flex flex-wrap gap-1 w-full  ">


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
