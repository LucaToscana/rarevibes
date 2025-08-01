export default function SoundCloudPlayer({ url, height = "166" }) {
  if (!url) return null;

  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url
  )}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

  return (
<div className="relative w-full" style={{ paddingTop: "166px" }}>
  <iframe
    className="absolute top-0 left-0 w-full h-full"
    src={src}
    frameBorder="0"
    allow="autoplay"
    title="SoundCloud Player"
  ></iframe>
</div>
  );
}