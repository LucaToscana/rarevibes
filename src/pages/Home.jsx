import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ArtistCard from '../components/ArtistCard'

export default function Home() {
  const parallaxRef = useRef(null)
  const [featuredArtists, setArtists] = useState([])

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
          <h1 className="font-monoton text-6xl lg:text-8xl  whitespace-nowrap">
            RARE VIBES
          </h1>
          <p className="font-arvo text-xl md:text-2xl mb-6 max-w-xl">
            A fanzine for raw sounds, weird thoughts, and glorious nonsense.
          </p>
          <Link
            to="/artists"
            className="btn-monza"
          >
            artists →
          </Link>
        </div>
      </section>

      {/* Artisti */}
      <section className="py-16 px-6 ">
        <h2 className="heading-monoton  mb-10 text-center">
          Latest Artists
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredArtists.map((artist) => (
            <ArtistCard artist={artist} showBio={true} />
          ))}
        </div>

      </section>

    </main>
  )
}
