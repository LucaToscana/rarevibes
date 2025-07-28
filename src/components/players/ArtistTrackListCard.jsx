import { useTranslation } from "react-i18next";
import CardStaticWrapper from "../layout/CardStaticWrapper";
import FiltersWrapper from "../layout/filtersWrapper";

export default function ArtistTrackListCard({ title = 'new artists', items = [], onSelect }) {
  const { t } = useTranslation('common'); // 👈 specifica il namespace */

  const bgImage =   'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/df00d922634873.56357e9e40721.jpg'


  return (
    <div className="w-[400px] h-full p-2 flex flex-col justify-between hidden sm:block relative  ">
      <CardStaticWrapper>


        <h2 className="text-xs font-bold font-arvo mb-2 uppercase w-fit z-10 pl-1 pt-1">
          {t('recentArtists')}
        </h2>
        <div
          className="max-w-md shadow-md overflow-hidden   relative text-white max-h-48"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '40px',
          }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-40" />



          {/* Lista con sfondo per ogni artista */}
          <ul className="relative z-10 space-y-2 overflow-y-auto pr-1 max-h-[150px] p-3  m-3">
            {items.slice(0, 10).map((item, index) => {
              const backgroundImage = item.images?.[0] || '';

              return (
                <FiltersWrapper>
                  <li
                    key={index}
                    onClick={() => onSelect(item)}
                    className="cursor-pointer relative w-72 font-arvo overflow-hidden group z-50 "
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {/* Overlay per oscurare lo sfondo */}
                    <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-40 transition-all pointer-events-none " />

                    {/* Contenuto testo */}
                    <div className="relative z-10 px-3 py-2 text-white flex items-center space-x-2">
                      <p className="text-xs font-semibold truncate">{item.singles?.[0]?.title || 'No title'}</p>
                      <span className="text-xs text-zinc-400 select-none">–</span>
                      <p className="text-xs text-zinc-300 truncate">{item.name}</p>
                    </div>
                  </li>
                </FiltersWrapper>);
            })}
          </ul>
        </div>
      </CardStaticWrapper>
    </div>
  );
}
