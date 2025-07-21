import { useDispatch } from 'react-redux';
import { setArtist, setPlatform, setAutoPlay, setPlayerOpen } from '../../store/playerSlice';
import { FaPlay } from "react-icons/fa";

export default function PlayButton({ artist }) {
  const dispatch = useDispatch();

  // Non mostrare il bottone se non ci sono singoli
  if (!artist?.singles || artist.singles.length === 0) {
    return null;
  }

  const handleSelect = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(setArtist(artist));
    dispatch(setPlatform(artist.defaultPlatform));
    dispatch(setAutoPlay(true));
    dispatch(setPlayerOpen(true));
  };

  return (
    <button
      onClick={handleSelect}
      className="bio-highlight-small mb-1 hover:bg-monzadark hover:text-white transition-colors cursor-pointer"
      aria-label={`Play ${artist?.name || "artist"}`}
      type="button"
    >
      <FaPlay className="text-iron p-1" size={16} />
    </button>
  );
}
