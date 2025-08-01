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
  bandcamp: SiBandcamp,
}

const colors = {
  spotify: ['bg-green-600', 'hover:bg-green-500'],
  soundcloud: ['bg-orange-600', 'hover:bg-orange-500'],
  youtube: ['bg-red-600', 'hover:bg-red-500'],
  bandcamp: ['bg-blue-600', 'hover:bg-blue-500'],
}

export default function ActivePlatformButton({ activeArtist, selectedPlatform, setSelectedPlatform }) {
  const firstSingle = activeArtist?.singles?.[0]
  const platformList = firstSingle?.platforms || {}

  const platform = selectedPlatform?.toLowerCase?.()

  if (!platform || !platformList[platform]) return null

  const Icon = iconsMap[platform]
  const [bgColor, hoverColor] = colors[platform] || ['bg-gray-700', 'hover:bg-gray-600']

  return (
    <div className="flex space-x-3 mb-2 gap-3">
      <FiltersWrapper>
        <button
          onClick={() => setSelectedPlatform(platform)}
          className={`px-3 py-2 font-semibold text-sm transition-colors flex items-center justify-center ${bgColor} text-white shadow-lg ${hoverColor}`}
          aria-label={platform}
          title={platform.charAt(0).toUpperCase() + platform.slice(1)}
        >
          <Icon size={15} />
        </button>
      </FiltersWrapper>
    </div>
  )
}
