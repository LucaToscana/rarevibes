import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import FiltersWrapper from '../layout/FiltersWrapper'


export default function ImageGalleryMobile({ images = [], openZoom }) {
    // Filtro immagini non valide e prendo massimo 3
    const safeImages = images.filter(Boolean).slice(0, 3)
    if (safeImages.length === 0) safeImages.push('/placeholder.png')

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevImage = () => {
        setCurrentIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1))
    }

    const nextImage = () => {
        setCurrentIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1))
    }

    return (
        <div
            className="md:hidden relative w-72  sm:w-96 h-72 flex items-center justify-center select-none bg-black"
        >            <div
            role="button"
            tabIndex={0}
            onClick={() => openZoom(safeImages[currentIndex])}
            onKeyDown={(e) => e.key === 'Enter' && openZoom(safeImages[currentIndex])}
            className="w-full h-full flex items-center justify-center cursor-pointer overflow-hidden"
        >
                <img
                    loading="lazy"
                    src={safeImages[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    style={{ userSelect: 'none' }}
                    draggable={false}
                />
            </div>

            <div onClick={prevImage}
                style={{ left: 0 }}
                className="absolute top-1/2 -translate-y-1/2 p-2">
                <FiltersWrapper>
                    <button
                        aria-label="Previous Image"
                        type="button"

                    >
                        <FaChevronLeft className="w-5 h-5 text-monza mt-1" />
                    </button>
                </FiltersWrapper>
            </div>

            <div onClick={nextImage}
                style={{ right: 0 }}

                className="absolute top-1/2 -translate-y-1/2 ">
                <FiltersWrapper>
                    <button
                        aria-label="Next Image"
                        type="button"
                    >
                        <FaChevronRight className="w-5 h-5  text-monza mt-1" />
                    </button>
                </FiltersWrapper>
            </div>

        </div>
    )
}
