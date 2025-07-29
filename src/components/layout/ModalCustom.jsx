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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <CardWrapper>

        <div className={` shadow-lg p-6 max-w-md w-full ${colors[type]} bg-white`}>
          <p className="mb-4">{message}</p>

          <FiltersWrapper>
            <button
              className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
              onClick={onClose}
            >
              X
            </button>
          </FiltersWrapper>
        </div>

      </CardWrapper>
    </div>
  );
}
