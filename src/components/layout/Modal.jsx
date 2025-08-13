import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex flex-col pt-24"
      onClick={onClose}
    >
      <div
        className="flex-1 overflow-y-auto px-4 pb-8 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
