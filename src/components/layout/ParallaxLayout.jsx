import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import data from '../../data/defaultData';

export default function ParallaxLayout() {
  const parallaxRef = useRef(null);
  const heroImages = data.heroImagesDefault;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambio immagine ogni 4 secondi (fade slideshow)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${offset * -0.1}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Contenitore parallax con tutte le immagini */}
      <div
        ref={parallaxRef}
        className="fixed top-0 left-0 w-full h-[200vh]"
        style={{ zIndex: -1 }}
      >
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center filter grayscale transition-opacity duration-1000 ease-in-out pointer-events-none
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ backgroundImage: `url(${img})` }}
          >
            {/* Overlay chiaro semi-trasparente */}
            <div className="absolute inset-0 bg-gray-100 opacity-80"></div>
          </div>
        ))}
      </div>

      {/* Contenuto principale */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
