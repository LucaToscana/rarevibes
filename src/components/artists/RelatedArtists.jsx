import { Link } from 'react-router-dom'
import ArtistCard from './ArtistCard';

export default function RelatedArtists({ artists ,slug}) {
  window.scrollTo(0, 0);

  if (!artists || artists.length === 0) return null

  return (
    <div className="m-12 mb-48 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div key={artist.id} className='w-full '>
          <ArtistCard key={artist.id} artist={artist} showBio={true} slug={slug}/>
          </div>
        ))}
      </div>
    </div>
  )
}
