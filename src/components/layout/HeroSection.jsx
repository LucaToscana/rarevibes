// components/HeroSection.jsx
import { Link } from 'react-router-dom'

export default function HeroSection({ heroImages, currentIndex, parallaxRef }) {
  return (
    <section className="relative h-[140vh] overflow-hidden group">
      {/* Background fading images */}
      <div ref={parallaxRef} className="absolute inset-0 w-full h-full z-0 will-change-transform">
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hero ${index}`}
              className={`absolute inset-0 w-full h-full object-cover object-[center_40%] transition-opacity duration-1000 ease-in-out
                ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                grayscale group-hover:grayscale-0`}
            />
          ))}
        </div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg border border-zinc-200 dark:border-zinc-700 shadow-xl rounded-3xl p-8 md:p-10 text-center max-w-2xl w-full transition-all duration-300">
          <h1 className="font-monoton text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tight">RARE VIBES</h1>
          <p className="font-arvo text-base md:text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            A fanzine for raw sounds, weird thoughts, and glorious nonsense.
          </p>
          <Link
            to="/rarevibes/artists"
            className="inline-block text-sm md:text-base font-semibold bg-monza text-iron hover:bg-monzadark transition px-6 py-3 rounded-full shadow-md"
          >
            artists →
          </Link>
        </div>
      </div>
    </section>
  )
}
