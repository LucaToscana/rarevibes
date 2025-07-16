import {
  FaInstagram,
  FaSpotify,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaDiscord,
  FaTelegram,
  FaSnapchat
} from 'react-icons/fa'

const iconsMap = {
  instagram: FaInstagram,
  spotify: FaSpotify,
  twitter: FaTwitter,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  discord: FaDiscord,
  telegram: FaTelegram,
  snapchat: FaSnapchat
}

export default function SocialLinks({ socials = {} }) {
  const entries = Object.entries(socials).filter(([_, url]) => !!url)
  if (entries.length === 0) return null

  return (
    <div
      className="rounded p-4  z-20 cursor-pointer p-1"
    ><ul className="w-full flex flex-wrap justify-center  gap-4 text-zinc-300 z-100">

        {Object.entries(socials)
          .filter(([_, url]) => typeof url === 'string' && url.trim() !== '')
          .map(([platform, url]) => {
            const IconComponent = iconsMap[platform.toLowerCase()];
            return (
              <li key={platform}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arvo-monza flex items-center gap-1"
                  aria-label={platform}
                >
                  {IconComponent ? <IconComponent size={24} /> : platform}
                </a>
              </li>
            );
          })}
      </ul>
    </div>

  )
}
