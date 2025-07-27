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
    <div className="relative font-arvo w-80 bg-white border-[8px] border-black shadow-[15px_15px_0px_#000] rotate-[-2deg] transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:shadow-[20px_20px_0px_#000] active:animate-shake overflow-hidden rounded-xl">

      {/* Banner Tags Diagonale */}
      <div className="z-50 absolute top-1 right-[-95px] w-[350px] bg-black text-white py-2 rotate-45 overflow-hidden">
        <div className="marquee whitespace-nowrap">
          <div className="inline-block animate-marquee px-6">
            <ArtistTags artist={artist} />
          </div>
        </div>
      </div>

      {/* Immagine + contenuti cliccabili */}
      <Link
        to={`/artists/${artistSlug}`}
        className="group relative overflow-hidden h-32 max-h-32 md:h-72 md:max-h-72 block"
      >
        {/* Blur loading */}
        <div
          className={`absolute inset-0 bg-gray-300 z-10 transition-opacity duration-500 ${imgLoaded ? "opacity-0" : "opacity-100"
            }`}
        />
        <img
          src={imageSrc}
          alt={artist?.name || "Artist image"}
          onLoad={() => setImgLoaded(true)}
          onError={handleImageError}
          className={`w-full h-32 max-h-32 md:h-72 md:max-h-72 object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0 ${imgLoaded ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* Gradiente in basso */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-28 bg-gradient-to-t from-monza/95 via-monza/70 to-monza/50 z-20 rounded-b-xl" />

        {/* Contenuto testuale */}
        <div className="absolute bottom-4 left-4 right-4 z-30 text-white drop-shadow">
          <h2 className="font-monoton text-xl uppercase mb-1 border-b border-white w-fit">
            {artist?.name || "Artist"}
          </h2>

          {showBio && artist?.bio?.short && (
            <ArtistBio
              slug={artist.slug}
              field="short"
              className="text-sm text-white line-clamp-2"
              highlightClass="bio-highlight-white"
            />
          )}
        </div>

      </Link>
    </div>
  );
}
