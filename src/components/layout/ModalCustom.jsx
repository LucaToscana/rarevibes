import CardWrapper from "./CardWrapper";
import FiltersWrapper from "./FiltersWrapper";

export default function ModalCustom({ isOpen, message, type = "info", onClose }) {
  if (!isOpen) return null;

  const colors = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-800 text-white",
    warning: "bg-yellow-100 text-yellow-800",
    sending: "bg-blue-700 text-white",

  };

  return (
    <div className="fixed inset-0 z-[1000]">
      {/* Sfondo oscurante */}
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-auto" />

      {/* Contenuto della modale */}
      <div className="relative flex items-center justify-center min-h-screen">
        <CardWrapper>
          <div className={`shadow-lg p-4 max-w-md w-full ${colors[type]}`}>
            <div
              onClick={onClose}

              className="flex justify-end">
              <FiltersWrapper>
                <button
                  className="px-4 py-2 top-2 bg-gray-800 text-white hover:bg-gray-700"
                >
                  X
                </button>
              </FiltersWrapper>
            </div>
            <p className="m-4 text-2xl font-arvo">{message}</p>
          </div>
        </CardWrapper>
      </div>
    </div>


  );
}
