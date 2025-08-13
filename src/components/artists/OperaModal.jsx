import { createPortal } from "react-dom";

export default function OperaModal({
  selectedWork,
  activeImage,
  setActiveImage,
  setSelectedWork,
  openZoom
}) {
  if (!selectedWork) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex justify-center items-center p-4 overflow-auto pt-64"
      onClick={() => setSelectedWork(null)}
    >
      <div
        className="w-full max-w-4xl mt-48"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra chiudi */}
        <div className="flex justify-end mb-4">
          <button
            className="text-white text-2xl font-bold hover:text-gray-300"
            onClick={() => setSelectedWork(null)}
          >
            ✕
          </button>
        </div>

        {/* Immagine principale */}
        <img
          src={selectedWork.images[activeImage]}
          alt={selectedWork.title}
          className="max-h-[60vh] w-auto object-contain rounded mb-6 cursor-pointer mx-auto"
          onClick={() => openZoom(selectedWork.images[activeImage])}
        />

        {/* Thumbnails */}
        {selectedWork.images.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {selectedWork.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setActiveImage(idx)}
                className={`w-32 h-32 object-cover cursor-pointer rounded transition-transform hover:scale-105 ${
                  activeImage === idx ? "ring-4 ring-white" : ""
                }`}
              />
            ))}
          </div>
        )}

        {/* Info opera */}
        <div className="max-w-3xl text-white text-center mb-8 mx-auto pb-24">
          <h3 className="font-bold text-2xl mb-2">{selectedWork.title}</h3>
          <p className="text-sm mb-1">
            <strong>Tecnica:</strong> {selectedWork.technique}
          </p>
          <p className="text-sm mb-4">
            <strong>Materiali:</strong> {selectedWork.materials}
          </p>
          <p className="text-base">{selectedWork.description}</p>
          <div className="flex justify-center p-4">
            <p
              className="text-white cursor-pointer underline"
              onClick={() => setSelectedWork(null)}
            >
              torna al profilo
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
