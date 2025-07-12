export default function ArtistTrackListCard({ title = 'recents', items = [], onSelect }) {
  
  
    return (
    <div className="w-[420px] h-full bg-black bg-opacity-60 p-4 rounded-md flex flex-col justify-between hidden sm:block">
      {/* Titolo */}
      <div className="mb-4">
        <p className="font-arvo  text-xs text-white">{title}</p>
      </div>

      {/* Lista di brani o playlist */}
      <ul className="space-y-2 overflow-y-auto pr-1 max-h-[130px]">
        {items.slice(0, 10).map((item, index) => (
          <li
            key={index}
            onClick={() => onSelect(item)}
            className="cursor-pointer text-sm text-white bg-zinc-800 bg-opacity-50 hover:bg-zinc-700 hover:bg-opacity-80 px-3 py-2 rounded-md transition-all"
          >
            <p className=" text-xs font-semibold truncate">{item.title}</p>
            <p className="text-xs text-zinc-400 truncate">{item.artist}</p>
          </li>
        ))}
      </ul>

    </div>
  )
}
