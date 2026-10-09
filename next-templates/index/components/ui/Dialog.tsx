"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
export function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const overflow = document.body.style.overflow;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && dialog.open) dialog.close();
    const closeOnEscape = () => onClose();
    dialog.addEventListener("cancel", closeOnEscape);
    return () => {
      dialog.removeEventListener("cancel", closeOnEscape);
      if (dialog.open) dialog.close();
      if (open) document.body.style.overflow = overflow;
    };
  }, [open, onClose]);
  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog__inner">
        <div className="dialog__top">
          <span className="meta">{title}</span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
