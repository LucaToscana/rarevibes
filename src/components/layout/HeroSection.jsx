// components/HeroSection.jsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export default function HeroSection({ heroImages, currentIndex, parallaxRef }) {
  const { t } = useTranslation('common');
  return (
    <section className="relative h-96 sm:h-[220vh] overflow-hidden group">
      <div ref={parallaxRef} className="absolute inset-0 w-full h-full z-0 will-change-transform">
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
              onContextMenu={(e) => e.preventDefault()}
              alt={`Hero ${index}`}
              className={`absolute top-0 left-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out animate-fade-in-lg
          ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          grayscale group-hover:grayscale-0`}
            />
          ))}
        </div>
      </div>

      {/* Overlay Content */}


      <div className=" hidden relative z-10 flex items-center justify-center w-full h-full px-4">
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl	 border border-zinc-200 dark:border-zinc-700 shadow-xl rounded-3xl p-8 md:p-10 text-center max-w-4xl w-full transition-all duration-300">
          <h1 className="font-monoton text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tight">RARE VIBES</h1>
          <p className="font-arvo text-base md:text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            {t('tagline')}
          </p>
          <Link
            to="/artists"
            className="inline-block text-sm md:text-base font-semibold bg-monza text-iron hover:bg-monzadark transition px-6 py-3 rounded-full shadow-md"
          >
            {t('artists')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
