import ReactDOM from 'react-dom'

export default function ZoomModal({ zoomOpen, zoomImg, handleCloseZoom }) {
  if (!zoomOpen || !zoomImg) return null

  return ReactDOM.createPortal(
    <div
      onClick={handleCloseZoom}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center cursor-zoom-out z-[99999]"
    >
      <img
        src={zoomImg}
        alt="Zoomed"
        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg z-[100000]"
      />
    </div>,
    document.body
  )
}