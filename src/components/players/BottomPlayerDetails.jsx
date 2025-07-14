import { Link } from "react-router-dom";
import PlayerPlatformButtons from "./PlayerPlatformButtons";

export default function BottomPlayerDetails({ activeArtist, selectedPlatform, setSelectedPlatform }) {
  const artistSlug = activeArtist?.slug || activeArtist.id || "unknown-artist";
  const bgImage = activeArtist.images?.[0] || 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg'

  return (
    <div className="relative w-full sm:w-[390px] h-[190px] rounded-md overflow-hidden">
      {/* Sfondo immagine */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      {/* Overlay scuro per contrasto */}
      <div className="absolute inset-0 bg-black bg-opacity-60" aria-hidden="true" />

      {/* Contenuto */}
      <div className="relative z-10 p-4 flex flex-col items-end justify-between h-full text-white">
        {/* Info artista */}
        <div className="space-y-2 w-full">
          <Link
            to={`/artists/${artistSlug}`}
            className="font-arvo text-3xl text-left truncate hover:underline block"
          >
            {activeArtist.name}
          </Link>

          <p className="font-arvo text-xs text-left line-clamp-3">
            {activeArtist.bio.short}
          </p>
        </div>

        {/* Pulsanti piattaforma */}
        <div className="w-full flex justify-end mt-4">
          <PlayerPlatformButtons
            activeArtist={activeArtist}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
          />
        </div>
      </div>
    </div>
  )
}
