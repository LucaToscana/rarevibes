import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import FiltersWrapper from '../layout/FiltersWrapper';

export default function TogglePlayerButton({ playerOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={playerOpen ? 'Nascondi player' : 'Espandi player'}
      className="p-2 "
    >
      <FiltersWrapper>
        {!playerOpen ? (
          <FaChevronUp
            className="h-5 w-5 text-monza "
            aria-hidden="true"
          />
        ) : (
          <FaChevronDown
            className="h-5 w-5 text-white bg-monza "
            aria-hidden="true"
          />
        )}
      </FiltersWrapper>
    </button>
  );
}
