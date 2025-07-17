import { getClasses } from '../../utils';

function FilterButton({ label, value, currentFilter, onClick, custom }) {
  const isActive = currentFilter === value;
  const CustomTag = custom==='filter-button'? 'filter-button':'button';

  const className = getClasses({ isActive, type: CustomTag });

  return (
    <button onClick={() => onClick(value)} className={className}>
      {label}
    </button>
  );
}

export default FilterButton;