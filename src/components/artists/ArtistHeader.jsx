// ArtistHeader.jsx
import SocialLinks from './SocialLinks'

export default function ArtistHeader({ artist }) {
  const artistName = artist?.name?.trim() || "Artista sconosciuto"

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="artist-monoton text-center break-all w-full leading-tight p-2 overflow-hidden">
        {artistName}
      </p>


      {artist?.socials && (
        <div className="w-full flex justify-center">
          <SocialLinks socials={artist.socials} />
        </div>
      )}
    </div>
  )
}
