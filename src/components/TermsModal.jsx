import { useEffect } from "react";

export default function TermsModal({ open, onClose }) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Click outside to close
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tc-title"
      onClick={onBackdropClick}
    >
      <div
        className="w-full max-w-md bg-white text-black rounded-[28px] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="tc-title" className="text-3xl font-semibold">Terms &amp; Conditions</h2>

        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-4 pr-2 text-[14px] leading-6 text-neutral-700">
          <p>
            These are the Terms and Conditions governing the use of this Service and the agreement
            between you and the Company. They set out the rights and obligations of all users.
          </p>
          <p>
            By accessing or using the Service you agree to be bound by these Terms. If you disagree
            with any part, you may not access the Service. You represent that you are over 18.
          </p>
          <p>
            Your use is also conditioned on acceptance of our Privacy Policy, which describes how we
            collect, use and disclose personal information and your rights under applicable law.
          </p>
          <p>
            The Company may update these Terms from time to time. Continued use constitutes
            acceptance of the revised Terms.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="inline-flex px-5 py-2 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
