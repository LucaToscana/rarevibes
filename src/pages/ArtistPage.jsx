import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import SpotifyPlayer from '../components/SpotifyPlayer';
import SocialLinks from '../components/SocialLinks';
import RelatedArtists from '../components/RelatedArtists';
import YouTubePlayer from '../components/YouTubePlayer';

export default function ArtistPage() {
  const { slug } = useParams();
  const [artistsData, setArtistsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/data/artists.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setArtistsData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen   flex items-center justify-center">
        <p>Caricamento...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen   flex items-center justify-center">
        <p>Errore nel caricamento artisti: {error.message}</p>
      </main>
    );
  }

  const artist = artistsData.find((a) => a.slug === slug);
  const relatedArtists = artistsData.filter((a) => a.slug !== slug).slice(0, 3);

  if (!artist) {
    return (
      <main className="min-h-screen   flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Artista non trovato.</h1>
          <Link to="/artists" className="underline hover:text-zinc-300">
            Torna agli artisti
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen   max-w-6xl mx-auto px-6 py-12">
      <Link to="/artists" className="font-arvo underline hover:text-zinc-300 inline-block mb-6">
        ← Torna agli artisti
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Colonna sinistra */}
        <div className="md:col-span-2 space-y-6">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <h1 className="font-arvo text-4xl font-bold">{artist.name}</h1>
          <p className="font-roboto text-lg text-zinc-300">{artist.bio}</p>
        </div>

        {/* Colonna destra */}
        <div className="space-y-6">
          <SpotifyPlayer url={artist.spotify} />

          {artist.soundcloud && (
            <div>
              <h2 className="text-xl font-semibold mb-2">SoundCloud</h2>
              <iframe
                width="100%"
                height="120"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                  artist.soundcloud
                )}&color=%23000000&inverse=false&auto_play=false&show_user=true`}
                className="rounded-md"
              />
            </div>
          )}

          {artist.youtube && (
            <div>
              <YouTubePlayer videoId={artist.youtube.replace('watch?v=', '')} />
            </div>
          )}

          <SocialLinks socials={artist.socials} />
        </div>
      </div>

      {/* Artisti correlati */}
      <div className="mt-16">
        <RelatedArtists artists={relatedArtists} />
      </div>
    </main>
  );
}
