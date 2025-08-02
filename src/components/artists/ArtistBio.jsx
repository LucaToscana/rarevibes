import { useTranslation } from 'react-i18next';

const ArtistBio = ({ slug, name, field = 'short', className = '', highlightClass = 'bio-highlight' }) => {
  const { t } = useTranslation('bios');
  if (!slug || !field) return null;

  const bioText = t(`${slug}.${field}`);

  // Crea una regex per matchare sia slug che name, con escape per caratteri speciali
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSlug}|${escapedName})`, 'gi');

  const parts = bioText.split(regex);

  return (
    <p className={`${className} select-none text-justify`}>
      {parts.map((part, index) =>
        part.toLowerCase() === slug.toLowerCase() || part.toLowerCase() === name.toLowerCase() ? (
          <span key={index} className={highlightClass}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </p>
  );
};


export default ArtistBio;
