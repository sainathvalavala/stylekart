import { X } from "lucide-react";

function MobileFilterDrawer({ open, onClose, children }) {
  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/40 z-[999]
          transition-opacity duration-300 md:hidden
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* DRAWER */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-[1000] md:hidden
          bg-white rounded-t-2xl
          max-h-[85vh] overflow-y-auto
          transform transition-transform duration-300 ease-out
          ${open ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">Filters</h3>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  );
}

export default MobileFilterDrawer;
