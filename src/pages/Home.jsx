import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ArtistCard from '../components/ArtistCard'

export default function Home() {
  const parallaxRef = useRef(null)

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

  const featuredArtists = [
    { name: 'Luna Nera', image: '/artists/luna.jpg' },
    { name: 'Echo Dream', image: '/artists/echo.jpg' },
    { name: 'Velvet Boy', image: '/artists/velvet.jpg' },
  ]

  return (
    <main className="min-h-screen ">
      {/* Hero parallax */}
      <section className="relative h-[80vh] overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 w-full h-full z-0 will-change-transform"
        >
          <img
            src="/herobis.png"
            alt="RareVibes Hero"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="font-monoton text-8xl whitespace-nowrap">
            RARE VIBES
          </h1>         
           <p className="font-arvo text-xl md:text-2xl mb-6 max-w-xl">
            A fanzine for raw sounds, weird thoughts, and glorious nonsense.
          </p>
          <Link
            to="/artists"
            className="btn-monza"
          >
            Scopri gli artisti →
          </Link>
        </div>
      </section>

      {/* Artisti */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="font-arvo  text-3xl md:text-4xl font-bold mb-10 text-center">
          Artisti In Evidenza
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredArtists.map((artist) => (
            <ArtistCard artist={artist} />
          ))}
        </div>

      </section>

    </main>
  )
}
