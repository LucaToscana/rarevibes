import { useState } from "react";
import { Link } from "react-router-dom";
import ArtistBio from "./ArtistBio";
import ArtistTags from "./ArtistTags";
import CardWrapper from "../layout/CardWrapper";

export default function ArtistCard({ artist, showBio = false }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const artistSlug =
    artist?.slug || artist?.name?.toLowerCase().replace(/\s/g, "-") || "unknown-artist";

  const imageSrc = imgError
    ? "/herobis.png"
    : artist?.image1 || artist?.images?.[0] || "/herobis.png";

  const handleImageError = () => setImgError(true);

  return (
    <CardWrapper>

      <div className="marquee-wrapper flex flex-row w-full justify-center items-center">
        <ArtistTags artist={artist} />
      </div>

 
      {/* Titolo */}
      <h2 className="text-2xl font-bold font-arvo uppercase mb-2 border-b-2 border-black w-1/2">
        {artist?.name}
      </h2>
      {/* Link al profilo artista */}
      <Link
        to={`/artists/${artistSlug}`}
        className="group relative mt-4 block"
      >
        {/* Blur caricamento */}
        <div className="relative w-full aspect-[3/2] overflow-hidden group">
          {/* Placeholder grigio mentre l'immagine carica */}
          <div
            className={`absolute inset-0 bg-gray-300 z-10 transition-opacity duration-500 ${imgLoaded ? "opacity-0" : "opacity-100"
              }`}
          />

          {/* Immagine artista */}
          <img
            src={imageSrc}
            alt={artist?.name || "Artist image"}
            onLoad={() => setImgLoaded(true)}
            onError={handleImageError}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0 ${imgLoaded ? "opacity-100" : "opacity-0"
              }`}
          />
        </div>



      </Link>
    </CardWrapper>
  );
}