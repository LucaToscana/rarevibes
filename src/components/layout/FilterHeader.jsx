import React from 'react';
import { FaRedo } from 'react-icons/fa'; // Import the icon you want to use

const FilterHeader = ({ count, onReset }) => {
  return (
    <div className="flex items-center justify-between w-full py-2 border-t border-gray-300"> {/* Added justify-between */}
      <button
        onClick={onReset}
        className="flex items-center gap-1 text-monza underline hover:text-black transition focus:outline-none focus:ring-2 focus:ring-monza focus:ring-offset-2"
      >
        <FaRedo className="h-3 w-3" /> {/* The reset icon */}
      </button>

      <span className="w-7 text-center font-semibold bio-highlight-white mb-5 ml-5"> {/* Removed w-8, it might constrain the text */}
        {count} {/* Added "filtri attivi" for context */}
      </span>
    </div>
  );
};

export default FilterHeader;