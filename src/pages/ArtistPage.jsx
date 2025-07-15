import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchArtists,
  setSelectedArtist,
  clearSelectedArtist,
} from '../store/artistsSlice'

import ArtistHeader from '../components/artists/ArtistHeader'
import ArtistBio from '../components/artists/ArtistBio'
import ArtistImages from '../components/artists/ArtistImages'
import ArtistControls from '../components/artists/ArtistControls'
import RelatedArtistsSection from '../components/artists/RelatedArtistsSection'
import { useTranslation } from 'react-i18next'

export default function ArtistPage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { t } = useTranslation('common'); // 👈 specifica il namespace */


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])


  const { artistsData, loading, error, selectedArtist } = useSelector(
    (state) => state.artists
  )

  useEffect(() => {
    if (artistsData.length === 0) {
      dispatch(fetchArtists())
    }
  }, [dispatch, artistsData.length])

  useEffect(() => {
    if (artistsData.length > 0) {
      const artist = artistsData.find((a) => a.slug === slug)
      if (artist) {
        dispatch(setSelectedArtist(artist))
      } else {
        dispatch(clearSelectedArtist())
      }
    }
  }, [slug, artistsData, dispatch])

  if (loading) return <main className="min-h-screen flex items-center justify-center">Loading...</main>
  if (error) return <main className="min-h-screen flex items-center justify-center">Error: {error}</main>
  if (!selectedArtist) return <main className="min-h-screen flex items-center justify-center">Artist not found</main>

  const relatedArtists = artistsData
    .filter((a) => a.slug !== slug)
    .slice(0, 3)

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto">

      {/* Link di ritorno */}
      <div className="mt-16 mb-8">
        <Link to="/artists" className="title-small">
          ← {t('backToArtists')}
        </Link>
      </div>

      <div className="h-1 bg-monza mb-16" />

      {/* Contenuto principale: immagini e info */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* Info artista */}
        <section className="lg:w-1/3 flex flex-col gap-8 h-full min-h-[500px]">
          <ArtistHeader artist={selectedArtist} />
          <ArtistControls artist={selectedArtist} />


          <ArtistBio slug={selectedArtist.slug} field="short" />
          <ArtistBio slug={selectedArtist.slug} field="review" />

        </section>
        {/* Immagini artista */}

        <div className="lg:w-2/3">
          <ArtistImages images={selectedArtist.images} key={slug} slug={slug} />
          <div className='mt-8'>
            <ArtistBio slug={selectedArtist.slug} field="extended" />
          </div>

        </div>

      </div>

      {/* Artisti correlati */}
      <section className="mt-16">
        <div className="h-1 bg-monza m-3" />

        <h2 className="title-small text-right mb-2 italic">{t('youMightBeInterestedIn')}</h2>
        <RelatedArtistsSection artists={relatedArtists} slug={slug} />
      </section>
    </main>
  )
}
