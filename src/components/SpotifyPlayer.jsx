export default function SpotifyPlayer({ url }) {
  if (!url) return null
  const id = url.split('/').pop()

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Ascolta su Spotify</h2>
      <iframe
        src={`https://open.spotify.com/embed/track/5EgPbaGO0rWPFOjbiHQOir?utm_source=generator`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-md"
      />
    </div>
  )
}
