import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

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
            src="/hero.jpg"
            alt="RareVibes Hero"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="font-monoton text-5xl whitespace-nowrap">
            RARE VIBES
          </h1>          <p className="font-arvo text-xl md:text-2xl text-zinc-200 mb-6 max-w-xl">
            La fanzine per scoprire i nuovi suoni dell'underground.
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
            <Link
              key={artist.name}
              to={`/artists/${artist.name.toLowerCase().replace(/\s/g, '-')}`}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradiente sfumato molto opaco in basso */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20 rounded-b-xl" />

              {/* Titolo sopra il gradiente */}
              <h3 className="absolute bottom-4 left-4 right-4 z-30 font-roboto text-xl font-bold  drop-shadow-lg">
                {artist.name}
              </h3>
            </Link>

          ))}
        </div>

      </section>

    </main>
  )
}
