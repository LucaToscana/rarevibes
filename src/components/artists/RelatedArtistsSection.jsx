// RelatedArtistsSection.jsx
import RelatedArtists from './RelatedArtists'

export default function RelatedArtistsSection({ artists ,slug}) {
  return (
    <section className="mt-2">
      <RelatedArtists artists={artists} slug={slug} />
    </section>
  )
}
