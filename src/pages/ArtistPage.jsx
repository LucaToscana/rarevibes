import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RelatedArtists from '../components/RelatedArtists';
import ArtistPlayers from "../components/ArtistPlayers";
import SocialLinks from "../components/SocialLinks";
import { useDispatch } from 'react-redux';
import { setArtist } from '../store/playerSlice';
import ArtistPlayerButtons from '../components/ArtistPlayerButtons';
export default function ArtistPage() {
  const { slug } = useParams();
  const [artistsData, setArtistsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch();


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
  const handleImageError = () => {
    setImgError(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen   flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen   flex items-center justify-center">
        <p>Error: {error.message}</p>
      </main>
    );
  }

  const artist = artistsData.find((a) => a.slug === slug);
  const relatedArtists = artistsData.filter((a) => a.slug !== slug).slice(0, 3);

  if (!artist) {
    useEffect(() => {
      // carica i dati artista, poi:
      dispatch(setArtist(artist));
    }, []);

    return (
      <main className="min-h-screen   flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Not Found.</h1>
          <Link to="/artists" className="underline hover:text-zinc-300">
            Torna agli artisti
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen  px-6 py-12 mt-12">
      <Link
        to="/artists"
        className="title-small "
      >
        ← artists
      </Link>

      <div className="grid grid-cols-1 mt-2 md:grid-cols-3 gap-10">
        {/* Colonna sinistra */}
        <div className="md:col-span-2 space-y-6">
          <img
            src={imgError ? "/herobis.png" : artist.image}
            alt={artist.name}
            onLoad={() => setImgLoaded(true)}
            onError={handleImageError}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="flex flex-row justify-between items-start lg:items-center">
            <h1 className="heading-monoton">{artist.name}</h1>
            {artist.socials && <SocialLinks socials={artist.socials} />}
          </div>
          <p className="title-small">{artist.bio}</p>
        </div>

        {/* Colonna destra */}
        <div className="space-y-6">
          <ArtistPlayerButtons artist={artist} />
        </div>
      </div>

      {/* Artisti correlati */}
      <div className="mt-16">
        <RelatedArtists artists={relatedArtists} />
      </div>
    </main>
  );
}
