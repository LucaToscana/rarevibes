import React from 'react';
import { FaRedo } from 'react-icons/fa'; // Import the icon you want to use
import FiltersWrapper from './FiltersWrapper';

const FilterHeader = ({ count, onReset }) => {
  return (
    <FiltersWrapper>

      <div className="flex items-center w-fit gap-1">
        <button
        aria-label={"reset"}
          onClick={onReset}
          className="flex items-center gap-1 text-monza underline hover:text-black transition focus:outline-none focus:ring-2 focus:ring-monza focus:ring-offset-2"
        >
          <FaRedo className="h-3 w-3" /> {/* icona reset */}
        </button>

        <span className="font-semibold text-monza font-arvo">
          {count} {/* numero filtri attivi */}
        </span>
      </div>
    </FiltersWrapper>

  );
};

export default FilterHeader;