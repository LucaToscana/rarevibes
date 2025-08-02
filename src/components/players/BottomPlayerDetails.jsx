import { Link } from "react-router-dom";
import PlayerPlatformButtons from "./PlayerPlatformButtons";
import CardWrapper from "../layout/CardWrapper";
import FiltersWrapper from "../layout/FiltersWrapper";

export default function BottomPlayerDetails({ activeArtist, selectedPlatform, setSelectedPlatform }) {
  const artistSlug = activeArtist?.slug || activeArtist.id || "unknown-artist";
  const bgImage = activeArtist.images?.[0] || 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg';

  return (
    <div className="relative w-fit max-w-80  overflow-hidden h-fit flex items-center justify-between px-1 py-1 text-white">
      {/* Sfondo immagine */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black bg-opacity-60" aria-hidden="true" />

      {/* Contenuto */}
      <div className="relative z-10 flex items-center justify-between w-full gap-1">
        {/* Info artista */}
        <Link
          to={`/artists/${artistSlug}`}
          className="flex-shrink-0"
        >
          <FiltersWrapper>
            <h2 className="text-sm  text-monza font-arvo uppercase border-b-2 border-black">
              {activeArtist.name}
            </h2>
                    </FiltersWrapper>

        </Link>



        {/* Pulsanti piattaforma */}
        <div className="flex-shrink-0">
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
