// ArtistHeader.jsx
import SocialLinks from './SocialLinks'

export default function ArtistHeader({ artist }) {
  const artistName = artist?.name?.trim() || "Artista sconosciuto"

  return (
    <div className="flex flex-col gap-2 mb-6">
      <h1 className="heading-monoton text-2xl sm:text-3xl lg:text-4xl text-center break-words w-full">
        {artistName}
      </h1>
      {artist?.socials && (
        <div className="w-full flex justify-center">
          <SocialLinks socials={artist.socials} />
        </div>
      )}
    </div>
  )
}
