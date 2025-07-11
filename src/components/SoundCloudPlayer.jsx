export default function SoundCloudPlayer({ url, height = 120 }) {
  if (!url) return null;

  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url
  )}&color=%23000000&inverse=false&auto_play=false&show_user=true`;

  return (
    <div>
      <iframe
        width="100%"
        height={height}
        allow="autoplay"
        src={src}
        className="rounded-md"
        title="SoundCloud Player"
      />
    </div>
  );
}
