import { FaSpotify, FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { SiSoundcloud, SiYoutube, SiBandcamp } from 'react-icons/si'
import FiltersWrapper from '../layout/FiltersWrapper'

const iconsMap = {
  instagram: FaInstagram,
  spotify: FaSpotify,
  twitter: FaTwitter,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  soundcloud: SiSoundcloud,
  youtube: SiYoutube,
  bandcamp: SiBandcamp

}
export default function PlayerPlatformButtons({ activeArtist, selectedPlatform, setSelectedPlatform }) {
  // Prendi la prima traccia
  const firstSingle = activeArtist?.singles?.[0]

  // Ora platformList è la mappa delle piattaforme della prima traccia
  const platformList = firstSingle?.platforms || {}

  return (
    <div className="flex space-x-3  gap-1">
      {['spotify', 'soundcloud', 'youtube', 'bandcamp'].map(platform => {
        if (!platformList[platform]) return null  // controllo sulle piattaforme della traccia
        const Icon = iconsMap[platform]
        const isSelected =
          selectedPlatform?.toLowerCase?.() === platform.toLowerCase()
        const colors = {
          spotify: ['bg-green-600', 'hover:bg-green-500'],
          soundcloud: ['bg-orange-600', 'hover:bg-orange-500'],
          youtube: ['bg-red-600', 'hover:bg-red-500'],
          bandcamp: ['bg-blue-600', 'hover:bg-blue-500'],
        }

        return (
          <FiltersWrapper key={platform} >
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-1 py-1  font-semibold text-sm transition-colors flex items-center justify-center ${isSelected
                ? `${colors[platform][0]} text-white shadow-lg`
                : `bg-gray-700 text-gray-300 ${colors[platform][1]} hover:text-white`
                }`}
              aria-label={platform}
              title={platform.charAt(0).toUpperCase() + platform.slice(1)}
            >
              <Icon size={13} />
            </button></FiltersWrapper>
        )
      })}
    </div>
  )
}
