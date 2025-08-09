import ActivePlatformButton from './ActivePlatformButton'
import FiltersWrapper from '../layout/FiltersWrapper'

export default function ArtistOverlayCard({
  bgImage,
  activeArtist,
  activePlatform,
  selectedPlatform,
  setSelectedPlatform,
  toggleOpen,
}) {
  const capitalizedPlatform = selectedPlatform
    ? selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
    : ''

  return (
    <div
      className="absolute inset-0 w-full h-full bg-black bg-opacity-50 transition cursor-pointer duration-300 group-hover:bg-opacity-60"
      onClick={toggleOpen}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay nero trasparente sopra immagine */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenuto centrato verticalmente */}
      <div className="relative z-40 h-full w-full flex items-center sm:items-start px-5  text-white">
        <FiltersWrapper>
          <div className="flex flex-row items-center space-x-3 max-w-full pr-3 overflow-hidden">
            {/* Bottone piattaforma attiva */}
            <ActivePlatformButton
              activeArtist={activeArtist}
              selectedPlatform={capitalizedPlatform}
              setSelectedPlatform={setSelectedPlatform}
            />

            {/* Testo artista */}
            <div className="min-w-0">
              <h2 className="text-xs font-bold text-monza font-heming uppercase border-b-2 border-black truncate ">
                {activeArtist.name}
              </h2>

              <span
                className="font-heming text-black text-xs italic lowercase block truncate w-36"
                title={activeArtist.singles?.[0]?.title}
              >
                {activeArtist.singles?.[0]?.title}
              </span>

              {activePlatform && (
                <span
                  className="text-xs tracking-wide opacity-70 block truncate"
                  title={activePlatform}
                >
                  {capitalizedPlatform}
                </span>
              )}
            </div>
          </div>

        </FiltersWrapper>
      </div>
    </div>


  )
}
