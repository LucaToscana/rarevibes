// src/components/ArtistBio.jsx
import { useTranslation } from 'react-i18next';

const ArtistBio = ({ slug, field = 'short' }) => {
  const { t } = useTranslation('bios');

  if (!slug || !field) return null;

  return (
    <div className="text-zinc-800 dark:text-zinc-200">
      <p className="text-base md:text-lg leading-relaxed">
        {t(`${slug}.${field}`)}
      </p>
    </div>
  );
};

export default ArtistBio;
