import { useEffect, useRef, useState } from 'react'
import ArtistCard from '../components/artists/ArtistCard'
import HeroSection from '../components/layout/HeroSection'
import { useTranslation } from 'react-i18next';
import data from '../data/defaultData'

export default function Home() {
  const parallaxRef = useRef(null);
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredArtists, setArtists] = useState([]);

  const heroImages = data.heroImagesDefault;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${offset * 0.9}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Caricamento artisti
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/artists.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(data => setArtists(data))
      .catch(err => console.error('Errore nel caricamento artisti:', err))
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero parallax */}
      <HeroSection
        heroImages={heroImages}
        currentIndex={currentIndex}
        parallaxRef={parallaxRef}
      />

      {/* Artists */}
      <section className="py-16 px-6">
        <div className="artist-monoton mb-8 mt-10">{t('recentArtists')}</div>
        <div className="h-1 bg-monza mb-16" />
        <div className="grid gap-6 md:grid-cols-3">
          {featuredArtists.map((artist) => (
            <ArtistCard key={artist.name} artist={artist} showBio={true} />
          ))}
        </div>
      </section>
    </main>
  )
}
