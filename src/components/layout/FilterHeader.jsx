import React from 'react';
import { FaRedo } from 'react-icons/fa'; // Import the icon you want to use

const FilterHeader = ({ count, onReset }) => {
  return (
    <div className="flex items-center justify-end w-full py-2 border-t border-gray-300 gap-2">
      <button
        onClick={onReset}
        className="flex items-center gap-1 text-monza underline hover:text-black transition focus:outline-none focus:ring-2 focus:ring-monza focus:ring-offset-2"
      >
        <FaRedo className="h-3 w-3" /> {/* icona reset */}
      </button>

      <span className="text-center font-semibold bio-highlight-white mb-5 ml-0">
        {count} {/* numero filtri attivi */}
      </span>
    </div>
  );
};

export default FilterHeader;