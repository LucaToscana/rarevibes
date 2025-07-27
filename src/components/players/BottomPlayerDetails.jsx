import { Link } from "react-router-dom";
import PlayerPlatformButtons from "./PlayerPlatformButtons";

export default function BottomPlayerDetails({ activeArtist, selectedPlatform, setSelectedPlatform }) {
  const artistSlug = activeArtist?.slug || activeArtist.id || "unknown-artist";
  const bgImage = activeArtist.images?.[0] || 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg';

  return (
    <div className="relative w-full rounded-md overflow-hidden h-24 justify-end">
      {/* Sfondo immagine */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black bg-opacity-60" aria-hidden="true" />

      {/* Contenuto */}
      <div className="relative z-10 px-2 py-1 flex flex-col justify-between h-full text-white">
        {/* Info artista */}
        <div className="flex flex-row items-center justify-between gap-3 w-full">
          <Link
            to={`/artists/${artistSlug}`}
            className="text-xs truncate hover:underline w-1/3 bio-highlight text-center "
          >
            {activeArtist.name}
          </Link>

          <p className="font-arvo text-[11px] line-clamp-2 w-2/3 overflow-hidden mt-1">
            {activeArtist.bio.short}
          </p>
        </div>

        {/* Pulsanti piattaforma */}
        <div className="flex justify-end mt-2">
          <PlayerPlatformButtons
            activeArtist={activeArtist}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
          />
        </div>
      </div>
      
    </div>
  );
}
