import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import FiltersWrapper from '../components/layout/FiltersWrapper'
import PlayerPlatformButtons from '../components/players/PlayerPlatformButtons'
import { setArtist, setAutoPlay, setPlatform, setPlayerOpen } from '../store/playerSlice'

export default function ArtistPage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { t } = useTranslation('common');
  const { platform } = useSelector((state) => state.player)

  const [selectedPlatform, setSelectedPlatform] = useState(platform)


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


  const handlePlay = (platform) => {
    const artist = artistsData.find((a) => a.slug === slug)

    dispatch(setArtist(artist))
    dispatch(setPlatform(platform))
    dispatch(setAutoPlay(true))
    dispatch(setPlayerOpen(true))
    setSelectedPlatform
  }

  if (loading) return <main className="font-arvo text-monza min-h-screen flex items-center justify-center font-arvo"><CardWrapper>RARE VIBES</CardWrapper></main>
  if (error) return <main className="font-arvo text-monza min-h-screen flex items-center justify-center"><CardWrapper>Error: {error}</CardWrapper></main>
  if (!selectedArtist) return <main className="font-arvo text-monza min-h-screen  flex items-center justify-center"><CardWrapper> {t("no_artists_found")}</CardWrapper></main>

  const relatedArtists = artistsData
    .filter((a) => a.slug !== slug)
    .slice(0, 3)

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto">

      {/* Link di ritorno */}
      <div className="mt-8 font-arvo w-fit mb-8 pt-12">
        <CardWrapper className="animate-fade-in">

          <Link to="/artists">
            ← {t('backToArtists')}
          </Link>

        </CardWrapper>


      </div>


      {/* Contenuto principale: immagini e info */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Info artista */}

        <section className="lg:w-1/3 flex flex-col gap-6 h-full min-h-[500px] p-2">
          <CardWrapper >
            <h2 className="text-2xl font-bold font-arvo uppercase mb-2 border-b-2 border-black w-64">
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

          <CardWrapper >
            <ArtistBio slug={selectedArtist.slug}
              field="short"
              className='bio-text-white  drop-shadow'
              highlightClass='bio-highlight-white' />


            <ArtistBio slug={selectedArtist.slug}
              field="review"
              className='bio-text-white  drop-shadow'
              highlightClass='bio-highlight-white mt-8' />

            <ArtistBio slug={selectedArtist.slug}
              field="extended"
              className='bio-text-white drop-shadow'
              highlightClass='bio-highlight-white mt-8' />
          </CardWrapper>

        </section>
        {/* Immagini artista */}

        <div className="lg:w-2/3 animate-fade-in-lg ">
          <ArtistImages images={selectedArtist.images} key={slug} slug={slug} />


          <CardWrapper >
            <ArtistBio slug={selectedArtist.slug}
              field="extended"
              className='bio-text-white drop-shadow'
              highlightClass='bio-highlight-white' />
          </CardWrapper>
        </div>

      </div>


      {selectedArtist?.socials && (
        <div className="w-full flex justify-end mt-16">

          <CardWrapper className="animate-fade-in">
            <SocialLinks socials={selectedArtist.socials} />
          </CardWrapper>
        </div>
      )}
      {/* Artisti correlati */}
      <section className="mt-16">


        <SectionDivider></SectionDivider>

        <div className="flex justify-end text-xs">

          <SectionTitle><p className='text-xs'>{t('youMightBeInterestedIn')}</p></SectionTitle>

        </div>
        <RelatedArtistsSection artists={relatedArtists} slug={slug} />
      </section>
    </main>
  )
}
