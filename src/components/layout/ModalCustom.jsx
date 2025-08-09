import CardWrapper from "./CardWrapper";
import FiltersWrapper from "./FiltersWrapper";

import ReactDOM from "react-dom";

export default function ModalCustom({ isOpen, message, type = "info", onClose }) {
  if (!isOpen) return null;

  const colors = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-800 text-white",
    warning: "bg-yellow-100 text-yellow-800",
    sending: "bg-blue-700 text-white",
  };

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[99999] cursor-pointer"
    >    <CardWrapper>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`max-w-md w-full p-6 shadow-lg ${colors[type]} cursor-default`}
        >
          <div className="flex justify-end">
            <FiltersWrapper> <button
              onClick={onClose}
              aria-label={"close"}
              className="px-4 py-2 bg-monzadark text-white hover:bg-monza  "
            >
              X
            </button></FiltersWrapper>
          </div>
          <p className="mt-4 text-xl font-heming text-center">{message}</p>
        </div></CardWrapper>
    </div>,
    document.body
  );
}
