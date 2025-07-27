import { useState } from "react";
import { Link } from "react-router-dom";
import ArtistBio from "./ArtistBio";
import ArtistTags from "./ArtistTags";

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
    <div className="relative font-arvo w-full h-20 bg-white border-[6px] border-monzadark rounded-xl overflow-hidden shadow-[10px_10px_0px_#000] rotate-[-1.5deg] transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:shadow-[15px_15px_0px_#000] active:animate-shake">

      {/* Banner diagonale */}
      <div className="z-50 absolute top-1 right-[-85px] w-[300px] bg-black text-white py-2 rotate-45 transition-colors duration-500 overflow-hidden">
        <div className="flex flex-wrap justify-center items-center gap-1 px-4 text-xs">
          <ArtistTags artist={artist} />
        </div>
      </div>

      {/* Link al profilo artista */}
      <Link
        to={`/artists/${artistSlug}`}
        className="group relative h-full block"
      >
        {/* Blur caricamento */}
        <div
          className={`absolute inset-0 bg-gray-300 z-10 transition-opacity duration-500 ${imgLoaded ? "opacity-0" : "opacity-100"}`}
        />

        {/* Immagine artista */}
        <img
          src={imageSrc}
          alt={artist?.name || "Artist image"}
          onLoad={() => setImgLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Gradient per leggibilità testo */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-20" />

        {/* Testo artista */}
        <div className="absolute bottom-3 left-4 right-4 z-30 text-white drop-shadow-md">


          {showBio && artist?.bio?.short && (
            <ArtistBio
              slug={artist.slug}
              field="short"
              className="text-xs md:text-sm text-white line-clamp-2"
              highlightClass="bio-highlight-white"
            />
          )}
        </div>
      </Link>
    </div>
  );
}