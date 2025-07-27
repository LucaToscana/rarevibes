export default function ArtistTags({ artist = {} }) {
  const tags = [
    ...(artist.type || []),
    ...(artist.genres || [])
  ];

  if (tags.length === 0) return null;

  return (
    <div className="marquee-wrapper w-full max-w-xs">
      <div className="marquee-content text-white font-semibold gap-4">
        {tags.map((tag, i) => (
          <span key={i} className="mx-2 bio-highlight-white-xs inline-block">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
