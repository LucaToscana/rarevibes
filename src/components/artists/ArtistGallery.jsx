import { useState, useEffect } from "react";
import CardStaticWrapper from "../layout/CardStaticWrapper";
import ZoomModal from "../layout/ZoomModal";
import OperaModal from "./OperaModal";

export default function ArtistGallery({ works }) {
  const [selectedWork, setSelectedWork] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomImg, setZoomImg] = useState(null);

  // Blocca lo scroll quando modal aperto
  useEffect(() => {
    document.body.style.overflow = selectedWork || zoomOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedWork, zoomOpen]);

  const openZoom = (img) => {
    setZoomImg(img);
    setZoomOpen(true);
  };

  const closeZoom = () => {
    setZoomOpen(false);
    setZoomImg(null);
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl text-monza font-bold mb-4">Gallery</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {works.map((work) => (
          <CardStaticWrapper key={work.id}>
            <div
              className="cursor-pointer group"
              onClick={() => {
                setSelectedWork(work);
                setActiveImage(0);
              }}
            >
              <img
                src={work.images[0]}
                alt={work.title}
                className="w-full h-48 object-cover shadow-md transition-transform"
              />
              <p className="mt-2 text-sm text-center">{work.title}</p>
            </div>
          </CardStaticWrapper>
        ))}
      </div>

      {/* Modal Opera via Portal */}
      <OperaModal
        selectedWork={selectedWork}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
        setSelectedWork={setSelectedWork}
        openZoom={openZoom}
      />

      {/* Zoom Modal */}
      {zoomOpen && zoomImg && (
        <ZoomModal
          zoomOpen={zoomOpen}
          zoomImg={zoomImg}
          handleCloseZoom={closeZoom}
        />
      )}
    </section>
  );
}
