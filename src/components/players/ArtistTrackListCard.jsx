export default function ArtistTrackListCard({ title = 'recents', items = [], onSelect }) {
  const bgImage =  'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg'


  return (
    <div
      className="w-[420px] h-full p-4 rounded-md flex flex-col justify-between hidden sm:block bg-cover bg-center relative"
     /* style={{
        backgroundImage: `url(${bgImage})`,
      }}*/
    >
      {/* Overlay per scurire l'immagine */}
      <div className="absolute inset-0 bg-black bg-opacity-60 rounded-md" />

      {/* Contenuto sopra lo sfondo */}
      <div className="relative z-10">
        {/* Titolo */}
        <div className="mb-4">
          <p className="font-arvo text-xs text-white">{title}</p>
        </div>

        {/* Lista di brani o playlist */}
        <ul className="space-y-2 overflow-y-auto pr-1 max-h-[130px]">
          {items.slice(0, 10).map((item, index) => (
            <li
              key={index}
              onClick={() => onSelect(item)}
              className="cursor-pointer text-sm text-white bg-zinc-800 bg-opacity-50 hover:bg-zinc-700 hover:bg-opacity-80 px-3 py-2 rounded-md transition-all"
            >
              <p className="text-xs font-semibold truncate">{item.title}</p>
              <p className="text-xs text-zinc-400 truncate">{item.artist}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>

  )
}
