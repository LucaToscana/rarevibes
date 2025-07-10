import { Link } from 'react-router-dom'

export default function RelatedArtists({ artists }) {
    window.scrollTo(0, 0);

  if (!artists || artists.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">You might be interested in</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <Link
            to={`/artists/${artist.slug}`}
            key={artist.slug}
            className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition"
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{artist.name}</h3>
            <p className="text-sm text-zinc-400">{artist.bio}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
