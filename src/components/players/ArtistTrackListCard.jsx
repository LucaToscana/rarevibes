import { useTranslation } from "react-i18next";

export default function ArtistTrackListCard({ title = 'new artists', items = [], onSelect }) {
   const { t } = useTranslation('common'); // 👈 specifica il namespace */
 
 
 
  return (
    <div className="w-[420px] h-full p-4 rounded-md flex flex-col justify-between hidden sm:block bg-black bg-opacity-60 relative  ">
      {/* Titolo */}
      <div className="mb-4 relative">
        <p className="font-arvo text-xs text-white">{t('recentArtists')}</p>
      </div>

      {/* Lista con sfondo per ogni artista */}
      <ul className="space-y-2 overflow-y-auto pr-1 max-h-[150px]">
        {items.slice(0, 10).map((item, index) => {
          const backgroundImage = item.images?.[0] || '';

          return (
            <li
              key={index}
              onClick={() => onSelect(item)}
              className="cursor-pointer relative rounded-md overflow-hidden group z-100"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Overlay per oscurare lo sfondo */}
              <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-40 transition-all" />

              {/* Contenuto testo */}
              <div className="relative z-10 px-3 py-2 text-white flex items-center space-x-2">
                <p className="text-xs font-semibold truncate">{item.singles?.[0]?.title || 'No title'}</p>
                <span className="text-xs text-zinc-400 select-none">–</span>
                <p className="text-xs text-zinc-300 truncate">{item.name}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
