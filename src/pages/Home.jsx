import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ArtistCard from '../components/ArtistCard'
import HeroSection from '../components/HeroSection'

export default function Home() {
  const parallaxRef = useRef(null)

  const heroImages = [
    //hell city
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/df00d922634873.56357e9e40721.jpg',
    //face
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/53f6c717180319.5634931be500f.jpg',
    //zecchino 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/006a6182007313.5d10e7695551e.jpg',
    //leon 'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/c9c29824752085.56339764e19d6.jpg',
    //money 
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/864dbe22634873.563161cc37e95.jpg',
    //monkey
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/197cd9216759479.6785936ec6e94.jpg'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [featuredArtists, setArtists] = useState([])

  // Loop immagini ogni 5 secondi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
    fetch('/data/artists.json')
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
        <h2 className="heading-monoton mb-10 text-center">Latest Artists</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredArtists.map((artist) => (
            <ArtistCard key={artist.name} artist={artist} showBio={true} />
          ))}
        </div>
      </section>
    </main>
  )
}
