import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setZoomOpen, closeZoom, setPlayerOpen } from '../../store/playerSlice'
import ImageGalleryMobile from './ImageGalleryMobile'

export default function ImageGallery({ images, slug }) {
  const dispatch = useDispatch()
  const zoomOpen = useSelector(state => state.player.zoomOpen)
  const zoomImg = useSelector(state => state.player.zoomImg)
  const [visible, setVisible] = useState(false)


  const { artistsData, loading, error, selectedArtist } = useSelector(
    (state) => state.artists
  )


  useEffect(() => {
    setVisible(false)        // reset animazione
    const timer = setTimeout(() => setVisible(true), 10)  // fai partire animazione

    return () => clearTimeout(timer)
  }, [slug])
  const safeImages = [
    images[0] || '/placeholder.png',
    images[1] || images[0] || '/placeholder.png',
    images[2] || images[1] || images[0] || '/placeholder.png',
  ]

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        dispatch(closeZoom())
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])

  // **DISABILITA SCROLL QUANDO ZOOM APERTO**
  useEffect(() => {
    if (zoomOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [zoomOpen])

  const openZoom = (img) => {
    dispatch(setZoomOpen({ open: true, img }))
    dispatch(setPlayerOpen(false))
  }

  const handleCloseZoom = () => {
    dispatch(closeZoom())
  }

  return (
    <>
      <div className="hidden md:grid grid-cols-3 gap-4 items-start">
        {/* Immagine principale (2/3 colonne) */}
        <div
          className="col-span-2 rounded-lg overflow-hidden cursor-pointer h-[600px]"
          role="button"
          tabIndex={0}
          onClick={() => openZoom(safeImages[0])}
          onKeyDown={(e) => e.key === 'Enter' && openZoom(safeImages[0])}
        >
          <img
            src={safeImages[0]}
            alt="Main"
            className="w-full h-full object-contain object-center transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Colonna destra (1/3 colonna) */}
        <div className="flex flex-col gap-4 h-[600px] justify-between">
          {[safeImages[1], safeImages[2]].map((img, idx) => (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              onClick={() => openZoom(img)}
              onKeyDown={(e) => e.key === 'Enter' && openZoom(img)}
              className="rounded-lg overflow-hidden cursor-pointer h-1/2 transition-opacity transition-transform"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${300 + idx * 200}ms`,
              }}
            >
              <img
                src={img}
                alt={`Side ${idx + 1}`}
                className="w-full h-full object-contain object-center transition-transform duration-300 hover:scale-105"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout visibile solo su piccoli schermi */}
      <div className="block md:hidden">
        <ImageGalleryMobile images={safeImages} openZoom={openZoom} />
      </div>




      {zoomOpen && zoomImg && (
        <div
          onClick={handleCloseZoom}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center cursor-zoom-out z-50"
        >
          <img
            src={zoomImg}
            alt="Zoomed"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  )
}