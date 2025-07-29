import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setZoomOpen, closeZoom, setPlayerOpen } from '../../store/playerSlice'
import ImageGalleryMobile from './ImageGalleryMobile'
import CardWrapper from '../layout/CardWrapper'
import ZoomModal from '../layout/ZoomModal'

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
      <div className="hidden md:grid grid-cols-3 gap-4 items-start pb-8  pr-8">
        {/* Immagine principale (2/3 colonne) */}
        <div
          className="col-span-2 rounded-lg overflow-hidden cursor-pointer lg:p-16 h-[600px] "
          role="button"
          tabIndex={0}
          onClick={() => openZoom(safeImages[0])}
          onKeyDown={(e) => e.key === 'Enter' && openZoom(safeImages[0])}
        >
          <CardWrapper>  <img
            src={safeImages[0]}
            alt="Main"
            className="w-full h-full object-contain object-center transition-transform duration-300 hover:scale-105"
          /></CardWrapper>
        </div>

        {/* Colonna destra (1/3 colonna) */}
        <div className="flex flex-col gap-4 h-[600px] justify-between p-4">
          {[safeImages[1], safeImages[2]].map((img, idx) => (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              onClick={() => openZoom(img)}
              onKeyDown={(e) => e.key === 'Enter' && openZoom(img)}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${300 + idx * 200}ms`,
              }}
              className="h-1/2"
            >
              <CardWrapper>
                <img
                  src={img}
                  alt={`Side ${idx + 1}`}
                  className="w-full h-full object-contain object-center transition-transform duration-300 hover:scale-105"
                  draggable={false}
                />
              </CardWrapper>
            </div>
          ))}
        </div>

      </div>

      {/* Mobile layout visibile solo su piccoli schermi */}
      <div className="block md:hidden ">
        <div className='p-8'>

          <CardWrapper>




            <ImageGalleryMobile images={safeImages} openZoom={openZoom} />


          </CardWrapper>
        </div>
      </div>




      {zoomOpen && zoomImg && (
        <ZoomModal
          zoomOpen={zoomOpen}
          zoomImg={zoomImg}
          handleCloseZoom={handleCloseZoom}
        />
      )}
    </>
  )
}