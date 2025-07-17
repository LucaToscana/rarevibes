// FilterHeader.jsx
import React from 'react';

const FilterHeader = ({ count, onReset }) => {
  return (
    <div className="flex items-center gap-2 w-full py-2 border-t border-gray-300">
      <span>{count} filters</span>
      <button
        onClick={onReset}
        className="text-monza underline hover:text-black transition"
      >
        Reimposta
      </button>
    </div>
  );
};

export default FilterHeader;
