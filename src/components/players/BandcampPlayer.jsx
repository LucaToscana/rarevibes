export default function BandcampPlayer({ albumId }) {
  if (!albumId) return null;

  const embedSrc = `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=ffffff/linkcol=de270f/tracklist=false/artwork=small/transparent=true/`;

  return (
    <div className="w-full h-[120px]">
      <iframe
        src={embedSrc}
        style={{ border: 0, width: '100%', height: '120px' }}
        seamless
        title="Bandcamp Player"
      >
        <a href={`https://bandcamp.com/album/${albumId}`}>Listen on Bandcamp</a>
      </iframe>
    </div>
  );
}
