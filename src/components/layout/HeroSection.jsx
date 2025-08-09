// components/HeroSection.jsx
import { useTranslation } from 'react-i18next';
import ArtistCard from '../artists/ArtistCard';
import SectionTitle from './SectionTitle';

export default function HeroSection({ parallaxRef, featuredArtists }) {
  const { t } = useTranslation('common');
  return (
    <section className="min-h-screen relative flex flex-col">
      {/* Background Parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-full z-0 will-change-transform group"
      >

      </div>



      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col w-full h-full px-4 py-12 sm:py-16 mt-24">
        {/* Titolo */}
        <div className="mb-10 z-10">
          <SectionTitle>recent music</SectionTitle>
        </div>

        {/* Griglia Artisti - solo type "music" */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-9xl w-full px-2 sm:px-6 pointer-events-none">
          {featuredArtists
            .filter((artist) => artist.type.includes("music"))
            .map((artist) => (
              <div key={artist.name} className="flex justify-center pointer-events-auto">
                <ArtistCard artist={artist} showBio={true} />
              </div>
            ))}
        </div>

        {/* Titolo */}
        <div className="mb-10 mt-10">
          <SectionTitle>recent visual art</SectionTitle>
        </div>

        {/* Griglia Artisti - solo type "visualarts" */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-9xl w-full px-2 sm:px-6 pointer-events-none">
          {featuredArtists
            .filter((artist) => artist.type.includes("visualarts"))
            .map((artist) => (
              <div key={artist.name} className="flex justify-center pointer-events-auto">
                <ArtistCard artist={artist} showBio={true} />
              </div>
            ))}
        </div>

        {/* Titolo */}
        <div className="mb-10 mt-10">
          <SectionTitle>recent music</SectionTitle>
        </div>

        {/* Griglia Artisti */}
        {/* Griglia Artisti */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-9xl w-full px-2 sm:px-6 pointer-events-none">
          {featuredArtists.map((artist) => (
            <div
              key={artist.name}
              className="flex justify-center pointer-events-auto"
            >
              <ArtistCard artist={artist} showBio={true} />
            </div>
          ))}
        </div>
      </div>

    </section>

  )
}
