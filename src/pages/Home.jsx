import { useEffect, useRef, useState } from 'react'
import HeroSection from '../components/layout/HeroSection'
import data from '../data/defaultData'

import useIsMobile from '../components/layout/useIsMobile';
import Read from './Read';
import AboutUs from './AboutUs';


export default function Home() {
  const parallaxRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredArtists, setArtists] = useState([]);
  const isMobile = useIsMobile(); // o usa una media query migliore
  const heroImages = isMobile ? data.heroImagesDefault : data.heroImagesDefault;
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


      <HeroSection
        heroImages={heroImages}
        currentIndex={currentIndex}
        parallaxRef={parallaxRef}
        featuredArtists={featuredArtists}
      />
      <div
        style={{
          backgroundColor: 'rgba(8, 0, 0, 0.5)',
          height: '50px',
          width: '100%',
        }}
      >
      </div>

      <Read></Read>

      <AboutUs></AboutUs>
      {/* <ProductsShopify></ProductsShopify> */}
      <div className='mb-64 h-64'></div>
    </main>
  )
}
