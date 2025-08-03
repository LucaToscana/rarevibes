import { getClasses } from '../../utils';
import { useTranslation } from 'react-i18next';
import FiltersWrapper from './FiltersWrapper';

function FilterButton({  label, value, currentFilter, onClick, custom }) {
  let isActive
  const { t } = useTranslation('filters');

  // Check if currentFilter is an array
  if (Array.isArray(currentFilter)) {
    // If it's an array, check if the array includes the button's value
    isActive = currentFilter.includes(value);
  } else {
    // If it's not an array, use strict equality as before
    isActive = currentFilter === value;
  }

  const customTag = custom === 'filter-button' ? 'filter-button' : 'button';

  const className = getClasses({ isActive, type: customTag });

  return (
    <FiltersWrapper>
    <button onClick={() => onClick(value)} className={className} aria-label={value}>
      {t(value, { defaultValue: label })}
    </button>
    </FiltersWrapper>

  );
}

export default FilterButton;