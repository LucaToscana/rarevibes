import { Link } from 'react-router-dom'
import PlayerPlatformButtons from './PlayerPlatformButtons'
import { useNavigate } from 'react-router-dom'

export default function BottomPlayerDetails({ activeArtist, selectedPlatform, setSelectedPlatform }) {
  const artistSlug = activeArtist?.slug
    || activeArtist.id
    || "unknown-artist";

  return (
    <div className="w-[420px] h-[190px] bg-black bg-opacity-60 p-4 rounded-md flex flex-col items-end justify-between">
      {/* Info artista */}
      <div className="space-y-2 w-full">
        <Link
          to={`/artists/artist-${artistSlug}`}
          className="font-arvo text-3xl text-left truncate text-white hover:underline block"
        >
          {activeArtist.name}

        </Link>

        <p className="font-arvo text-xs text-left line-clamp-3">
          {activeArtist.bio}
        </p>
      </div>

      {/* Pulsanti piattaforma in fondo */}
      <div className="w-full flex justify-end mt-4">
        <PlayerPlatformButtons
          activeArtist={activeArtist}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
        />
      </div>
    </div>
  )
}
