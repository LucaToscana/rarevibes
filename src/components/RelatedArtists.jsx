import { Link } from 'react-router-dom'
import ArtistCard from './ArtistCard';

export default function RelatedArtists({ artists }) {
  window.scrollTo(0, 0);

  if (!artists || artists.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">You might be interested in</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <ArtistCard artist={artist} showBio={true} />
        ))}
      </div>
    </div>
  )
}
