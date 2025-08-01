export default function SpotifyPlayer({ url }) {
  if (!url) return null;

  // Estrarre l'ID dall'URL
  const parts = url.split('/');
  const id = parts.pop().split('?')[0]; // rimuove eventuali query params

  // Identificare il tipo di contenuto: track, album, playlist, ecc.
  const type = parts.pop(); // es: "track" o "album"

  // Costruire l'URL embed
  const embedUrl = `https://open.spotify.com/embed/${type}/${id}`;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        allowFullScreen={true}
      />
    </div>
  );
}
