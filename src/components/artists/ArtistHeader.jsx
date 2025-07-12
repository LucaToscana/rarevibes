// ArtistHeader.jsx
import SocialLinks from './SocialLinks'

export default function ArtistHeader({ artist }) {
  return (
    <div className="flex justify-between items-start lg:items-center mb-4">
      <h1 className="heading-monoton">{artist.name}</h1>
      {artist.socials && <SocialLinks socials={artist.socials} />}
    </div>
  )
}
