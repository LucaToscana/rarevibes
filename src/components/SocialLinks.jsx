import { FaInstagram, FaSpotify, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa'

const iconsMap = {
  instagram: FaInstagram,
  spotify: FaSpotify,
  twitter: FaTwitter,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  // aggiungi altre piattaforme che ti servono
}

export default function SocialLinks({ socials = {} }) {
  const entries = Object.entries(socials)
  if (entries.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="title-small mb-2 underline">contact</h2>
      <ul className="flex gap-4 text-zinc-300">
        {entries.map(([platform, url]) => {
          const IconComponent = iconsMap[platform.toLowerCase()]
          return (
            <li key={platform}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="title-small flex items-center gap-1"
                aria-label={platform}
              >
                {IconComponent ? <IconComponent size={40} /> : platform}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
