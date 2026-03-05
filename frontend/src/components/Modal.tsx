import { useEffect, type ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  title?: string;
  onClose: () => void;
  width?: string;
};

export default function Modal({
  children,
  title,
  onClose,
  width = "w-[640px]",
}: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/10">
      <div className={`${width} pointer-events-auto relative bg-brown border-2 border-white/50 rounded-lg shadow-xl animate-scaleIn flex flex-col`}>

        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-white/20">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex-1 overflow-auto">
          {children}
        </div>

      </div>
    </div>
  );
}