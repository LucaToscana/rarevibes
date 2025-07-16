import { useTranslation } from 'react-i18next';

const ArtistBio = ({ slug, field = 'short', className = '', highlightClass = 'bio-highlight' }) => {
  const { t } = useTranslation('bios');
  if (!slug || !field) return null;

  const bioText = t(`${slug}.${field}`);
  const regex = new RegExp(`(${slug})`, 'gi'); // case-insensitive match

  const parts = bioText.split(regex);

  return (
    <p className={`${className} select-none`}>
      {parts.map((part, index) =>
        part.toLowerCase() === slug.toLowerCase() ? (
          <mark key={index} className={highlightClass}>
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </p>
  );
};

export default ArtistBio;
