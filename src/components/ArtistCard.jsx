import { useState } from "react";
import { Link } from "react-router-dom";

export default function ArtistCard({ artist, showBio = false }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const artistSlug = artist.name.toLowerCase().replace(/\s/g, "-");

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <Link
      to={`/artists/${artistSlug}`}
      className="group relative overflow-hidden rounded-xl shadow-lg"
    >
      {/* Effetto di caricamento blur */}
      <div
        className={`absolute inset-0 bg-gray-300 z-10 transition-opacity duration-500 ${
          imgLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      <img
        src={imgError ? "/herobis.png" : artist.image}
        alt={artist.name}
        onLoad={() => setImgLoaded(true)}
        onError={handleImageError}
        className={`w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105 ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Gradiente opaco in basso */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20 rounded-b-xl" />

      {/* Contenuto testuale sopra il gradiente */}
      <div className="absolute bottom-4 left-4 right-4 z-30 text-white">
        <h3 className="font-monoton text-xl drop-shadow-lg">{artist.name}</h3>
        {showBio && (
          <p className="font-roboto text-sm mt-1 line-clamp-3 drop-shadow">
            {artist.bio}
          </p>
        )}
      </div>
    </Link>
  );
}
