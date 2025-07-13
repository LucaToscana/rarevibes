import { useState } from "react";
import { Link } from "react-router-dom";

export default function ArtistCard({ artist, showBio = false, slug }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Safe slug creation
  const artistSlug = artist?.slug || artist?.name?.toLowerCase().replace(/\s/g, "-") || "unknown-artist";

  // Gestione fallback immagini: usa artist.image1, se no artist.images[0], se no immagine di riserva
  const imageSrc = imgError
    ? "/herobis.png"
    : artist?.image1 || artist?.images?.[0] || "/herobis.png";

  const handleImageError = () => setImgError(true);

  return (
    <Link
      to={`/artists/${artistSlug}`}
      className="group relative overflow-hidden rounded-xl shadow-lg"
    >
      {/* Blur di caricamento */}
      <div
        className={`absolute inset-0 bg-gray-300 z-10 transition-opacity duration-500 ${imgLoaded ? "opacity-0" : "opacity-100"
          }`}
      />

      <img
        src={imageSrc}
        alt={artist?.name || "Artist image"}
        onLoad={() => setImgLoaded(true)}
        onError={handleImageError}
        className={`w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0 ${imgLoaded ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Gradiente nero trasparente in basso */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-monza/95 via-monza/70 to-monza/50 z-20 rounded-b-xl" />

      {/* Contenuto */}
      <div className="absolute bottom-4 left-4 right-4 z-30 text-white">
        <h3 className="font-monoton text-xl text-white drop-shadow-lg">
          {artist?.name || "Artist"}
        </h3>
        {showBio && artist?.bio && (
          <p className="font-roboto text-sm mt-1 line-clamp-3 drop-shadow">
            {artist.bio}
          </p>
        )}
      </div>
    </Link>
  );
}
