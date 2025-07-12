// RelatedArtistsSection.jsx
import RelatedArtists from './RelatedArtists'

export default function RelatedArtistsSection({ artists ,slug}) {
  return (
    <section className="mt-16">
      <RelatedArtists artists={artists} slug={slug} />
    </section>
  )
}
