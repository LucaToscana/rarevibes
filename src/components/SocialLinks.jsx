export default function SocialLinks({ socials = {} }) {
  const entries = Object.entries(socials)
  if (entries.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Contatti Social</h2>
      <ul className="flex gap-4 text-zinc-300">
        {entries.map(([platform, url]) => (
          <li key={platform}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="underline capitalize">
              {platform}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
