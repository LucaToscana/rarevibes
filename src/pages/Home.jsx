import { useEffect, useRef, useState } from 'react'
import ArtistCard from '../components/artists/ArtistCard'
import HeroSection from '../components/layout/HeroSection'
import { useTranslation } from 'react-i18next';
import data from '../data/defaultData'
import SectionDivider from '../components/layout/SectionDivider';
import SectionTitle from '../components/layout/SectionTitle';
import CardWrapper from '../components/layout/CardWrapper';
import useIsMobile from '../components/layout/useIsMobile';

export default function Home() {
  const parallaxRef = useRef(null);
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredArtists, setArtists] = useState([]);
  const isMobile = useIsMobile(); // o usa una media query migliore
  const heroImages = isMobile ? data.heroImagesDefaultSmall : data.heroImagesDefault;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        parallaxRef.current.style.transform = `translateY(${offset * 0.5}px)`
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
    <main className="min-h-screen  ">
      {/* Hero parallax */}
      <div className=' mt-24 px-12 lg:px-24 '>


        <CardWrapper >
          <HeroSection
            heroImages={heroImages}
            currentIndex={currentIndex}
            parallaxRef={parallaxRef}
          /></CardWrapper>
          
          
          </div>


      <section className="py-16 px-6 max-w-7xl mx-auto">
{/** */}
        <div className='mb-8 mt-10 '>
          <SectionTitle> {t('recentArtists')}</SectionTitle>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center  mb-48 ">
          {featuredArtists.map((artist) => (
            <ArtistCard key={artist.name} artist={artist} showBio={true} />
          ))}
        </div>
      </section>
    </main>
  )
}
