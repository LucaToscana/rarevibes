import PlayButton from "../players/PlayButton";

export default function ArtistTags({ artist = {} }) {
  return (
    <div className="z-30 flex flex-col items-end gap-1">
      {artist.type.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-end items-center">
          {artist.type.map((t, index) => (
            <span key={index} className="bio-highlight-monza-xs">
              {t}
            </span>
          ))}
          <PlayButton artist={artist} />
        </div>
      )}

      {artist.genres.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-end">
          {artist.genres.map((g, index) => (
            <span key={index} className="bio-highlight-white-xs">
              {g}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
