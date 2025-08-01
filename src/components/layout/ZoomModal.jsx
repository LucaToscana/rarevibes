import { useState } from 'react';
import ReactDOM from 'react-dom';

export default function ZoomModal({ zoomOpen, zoomImg, handleCloseZoom }) {
  const [zoomed, setZoomed] = useState(false);

  if (!zoomOpen || !zoomImg) return null;

  const toggleZoom = (e) => {
    e.stopPropagation(); // 🔒 impedisce la propagazione al fondo
    setZoomed((prev) => !prev);
  };

  return ReactDOM.createPortal(
    <div
      onClick={() => {
        setZoomed(false); // reset zoom prima di chiudere
        handleCloseZoom();
      }}
      className="fixed inset-0 bg-black bg-opacity-80 z-[99999] overflow-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-10">
        <img
          src={zoomImg}
          alt="Zoomed"
          style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
          onContextMenu={(e) => e.preventDefault()}
          onClick={toggleZoom} // ✋ non chiude il modal
          className={`transition-transform duration-300 rounded-lg shadow-lg z-[100000] ${
            zoomed
              ? 'scale-100 cursor-zoom-out'
              : 'max-w-[90vw] max-h-[90vh] cursor-zoom-in'
          }`}
        />
      </div>
    </div>,
    document.body
  );
}
