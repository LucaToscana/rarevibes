import { FaSpotify, FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { SiSoundcloud, SiYoutube } from 'react-icons/si'

const iconsMap = {
  instagram: FaInstagram,
  spotify: FaSpotify,
  twitter: FaTwitter,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  soundcloud: SiSoundcloud,
  youtube: SiYoutube,
}

export default function PlayerPlatformButtons({ activeArtist, selectedPlatform, setSelectedPlatform }) {
  return (
    <div className="flex space-x-3 mb-4">
      {['spotify', 'soundcloud', 'youtube'].map(platform => {
        if (!activeArtist.platforms[platform]) return null  // <--- CORRETTO QUI
        const Icon = iconsMap[platform]
        const isSelected =
          selectedPlatform?.toLowerCase?.() === platform.toLowerCase()
        // Colori per piattaforme
        const colors = {
          spotify: ['bg-green-600', 'hover:bg-green-500'],
          soundcloud: ['bg-orange-600', 'hover:bg-orange-500'],
          youtube: ['bg-red-600', 'hover:bg-red-500'],
        }

        return (
          <button
            key={platform}
            onClick={() => setSelectedPlatform(platform)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors flex items-center justify-center ${isSelected
                ? `${colors[platform][0]} text-white shadow-lg`
                : `bg-gray-700 text-gray-300 ${colors[platform][1]} hover:text-white`
              }`}
            aria-label={platform}
            title={platform.charAt(0).toUpperCase() + platform.slice(1)}
          >
            <Icon size={20} />
          </button>
        )
      })}
    </div>
  )
}
