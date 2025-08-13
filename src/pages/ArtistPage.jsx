import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchArtists,
  setSelectedArtist,
  clearSelectedArtist,
} from '../store/artistsSlice'

import ArtistBio from '../components/artists/ArtistBio'
import ArtistImages from '../components/artists/ArtistImages'
import RelatedArtistsSection from '../components/artists/RelatedArtistsSection'
import { useTranslation } from 'react-i18next'
import SocialLinks from '../components/artists/SocialLinks'
import CardWrapper from '../components/layout/CardWrapper'
import SectionDivider from '../components/layout/SectionDivider'
import SectionTitle from '../components/layout/SectionTitle'
import PlayerPlatformButtons from '../components/players/PlayerPlatformButtons'
import { setArtist, setAutoPlay, setPlatform, setPlayerOpen } from '../store/playerSlice'
import ArtistProfile from '../components/artists/ArtistProfile'
import MerchList from '../components/artists/MerchList'
import ArtistGallery from '../components/artists/ArtistGallery'
import { addVisitedArtist } from '../store/visitedArtistsSlice'

export default function ArtistPage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { t } = useTranslation('common');
  const { platform } = useSelector((state) => state.player)

  const { artistsData, loading, error, selectedArtist } = useSelector(
    (state) => state.artists
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

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
        dispatch(addVisitedArtist(artist)) // 👈 alimenta lo slice

      } else {
        dispatch(clearSelectedArtist())
      }
    }
  }, [slug, artistsData, dispatch])

  const handlePlay = (platform) => {
    const artist = artistsData.find((a) => a.slug === slug)
    dispatch(setArtist(artist))
    dispatch(setPlatform(platform))
    dispatch(setAutoPlay(true))
    dispatch(setPlayerOpen(true))
  }

  if (loading)
    return (
      <main className="font-heming text-monza min-h-screen flex items-center justify-center">
        <CardWrapper>RARE VIBES</CardWrapper>
      </main>
    )
  if (error)
    return (
      <main className="font-heming text-monza min-h-screen flex items-center justify-center">
        <CardWrapper>Error: {error}</CardWrapper>
      </main>
    )
  if (!selectedArtist)
    return (
      <main className="font-heming text-monza min-h-screen flex items-center justify-center">
        <CardWrapper>{t("no_artists_found")}</CardWrapper>
      </main>
    )

  const relatedArtists = artistsData
    .filter((a) => a.slug !== slug)
    .slice(0, 3)

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-6 py-12">
      {/* Back link */}
      <div className="mt-8 mb-8 pt-12">
        <CardWrapper className="text-xs animate-fade-in lowercase font-heming w-fit">
          <Link to="/artists">← {t('backToArtists')}</Link>
        </CardWrapper>
      </div>

      {/* Main artist section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left column: artist info */}
        <section className="flex flex-col gap-6 lg:w-1/3 min-h-[500px] p-2">
          <CardWrapper className="w-fit min-w-64">
            <h2 className="text-2xl font-bold font-heming uppercase mb-2 border-b-2 border-black">
              {selectedArtist.name}
            </h2>
            <div className="flex justify-center mt-2">
              <PlayerPlatformButtons
                activeArtist={selectedArtist}
                selectedPlatform={platform}
                setSelectedPlatform={handlePlay}
              />
            </div>
          </CardWrapper>

          <CardWrapper>
            <ArtistBio
              slug={selectedArtist.slug}
              name={selectedArtist.name}
              field="short"
              highlightClass=""
            />
            <ArtistBio
              slug={selectedArtist.slug}
              name={selectedArtist.name}
              field="review"
              className="bio-text-white mt-8"
              highlightClass="bio-highlight-white"
            />
          </CardWrapper>

          <MerchList merch={selectedArtist.merch} />

          {selectedArtist?.socials && (
            <div className="flex justify-end w-full">
              <CardWrapper className="animate-fade-in">
                <SocialLinks socials={selectedArtist.socials} />
              </CardWrapper>
            </div>
          )}
        </section>

        {/* Right column */}
        <section className="lg:w-2/3 flex flex-col gap-6 animate-fade-in-lg">

          {/* Gallery full width for visual artists */}
          {selectedArtist.type?.includes("visualarts") &&
            selectedArtist.portfolio &&
            selectedArtist.portfolio.length > 0
            ? (
              <section className="mt-16 w-full   z-[9999]">
                <ArtistGallery works={selectedArtist.portfolio} />
              </section>
            )
            : (
              <ArtistImages images={selectedArtist.images} key={slug} slug={slug} />
            )
          }

          {selectedArtist.bio.extended && selectedArtist.bio.extended !== "" && (
            <CardWrapper>
              <ArtistBio
                slug={selectedArtist.slug}
                name={selectedArtist.name}
                field="extended"
                className="bio-text-white"
                highlightClass="bio-highlight-white"
              />
            </CardWrapper>
          )}

          <ArtistProfile slug={selectedArtist.slug} />
        </section>
      </div>



      {/* Related artists */}
      <section className="mt-16 relative z-0">
        <SectionDivider />
        <div className="flex justify-end text-xs mb-2">
          <SectionTitle>
            <p className="text-xs lowercase">{t('youMightBeInterestedIn')}</p>
          </SectionTitle>
        </div>
        <RelatedArtistsSection artists={relatedArtists} slug={slug} />
      </section>
    </main>
  )
}
