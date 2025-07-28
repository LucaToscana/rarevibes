import { useTranslation } from "react-i18next";

export default function ArtistTags({ artist = {} }) {

  const tags = [
    ...(artist.type || []),
    ...(artist.genres || [])
  ];

  if (tags.length === 0) return null;
  const { t } = useTranslation('filters');

  return (
    <div className="marquee-wrapper w-full  ">
      <div className="marquee-content text-white font-semibold">
        {/* Duplicazione interna per animazione fluida */}
        <div className="flex gap-4">
          {tags.map((tag, i) => (
            <span key={`tag1-${i}`} className="mx-2 font-arvo text-black  lowercase text-xs">
              {t(tag, { defaultValue: tag })}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {tags.map((tag, i) => (
            <span key={`tag2-${i}`} className="mx-2 font-arvo text-black lowercase text-xs">
              {t(tag, { defaultValue: tag })}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
