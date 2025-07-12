import { getClasses } from '../../utils'; 

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