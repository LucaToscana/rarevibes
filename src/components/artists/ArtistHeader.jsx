// ArtistHeader.jsx

export default function ArtistHeader({ artist }) {
  const artistName = artist?.name?.trim() || "Artista sconosciuto"

  return (
    <div className="flex flex-col items-center gap-2">
      <p style={{ fontFamily: 'wawe1', fontSize: '82px' }} className=" text-center break-all w-full leading-tight p-2 overflow-hidden">
        {artistName}
      </p>


    </div>
  )
}
