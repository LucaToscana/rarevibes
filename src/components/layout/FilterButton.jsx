import React from 'react';
import { getClasses } from '../../utils'; // se hai creato un file utils.js

function FilterButton({ label, value, currentFilter, onClick }) {
  const isActive = currentFilter === value;
  const className = getClasses({ isActive, type: 'button' });

  return (
    <button onClick={() => onClick(value)} className={className}>
      {label}
    </button>
  );
}

export default FilterButton;