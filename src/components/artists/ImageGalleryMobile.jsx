import { useState } from 'react'


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
            className="md:hidden relative  w-64 h-72 flex items-center justify-center select-none bg-black"
        >            <div
            role="button"
            tabIndex={0}
            onClick={() => openZoom(safeImages[currentIndex])}
            onKeyDown={(e) => e.key === 'Enter' && openZoom(safeImages[currentIndex])}
            className="w-full h-full flex items-center justify-center cursor-pointer overflow-hidden rounded-lg"
        >
                <img
                    src={safeImages[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    style={{ userSelect: 'none' }}
                    draggable={false}
                />
            </div>

            <button
                onClick={prevImage}
                aria-label="Previous Image"
                className="absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 focus:outline-none"
                type="button"
                style={{ left: 16 }}
            >
                ‹
            </button>

            <button
                onClick={nextImage}
                aria-label="Next Image"
                className="absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 focus:outline-none"
                type="button"
                style={{ right: 16 }}
            >
                ›
            </button>

        </div>
    )
}
