import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, title, onClose, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/45"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-full max-w-lg border border-charcoal/10 bg-white shadow-[0_24px_80px_rgba(23,23,23,0.18)]"
      >
        <div className="flex items-center justify-between border-b border-charcoal/8 px-6 py-4">
          <h2 id="modal-title" className="font-serif text-[22px] text-charcoal">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-muted hover:text-charcoal"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
        <div className="px-6 py-5 text-[14px] leading-relaxed text-charcoal/80">{children}</div>
        {footer ? <div className="flex justify-end gap-2 border-t border-charcoal/8 px-6 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}
