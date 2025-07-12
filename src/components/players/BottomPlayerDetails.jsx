import PlayerPlatformButtons from './PlayerPlatformButtons'

export default function BottomPlayerDetails({ activeArtist, selectedPlatform, setSelectedPlatform }) {
  return (
    <div className="w-[320px] h-full bg-black bg-opacity-60 p-4 rounded-md flex flex-col items-end justify-between">
      {/* Info artista */}
      <div className="space-y-2 w-full">
        <p className="font-arvo text-3xl text-left truncate">
          {activeArtist.name}
        </p>
        <p className="font-arvo text-xl text-left truncate">
          {activeArtist.single}
        </p>
        <p className="text-sm text-zinc-300 uppercase tracking-wide text-left">
          {selectedPlatform
            ? selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
            : ''}
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
