import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
  onClose: VoidFunction;
}

export function Dialog({ children, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[1200px] bg-[#0F0D23] p-8 md:p-12 rounded-2xl shadow-lg my-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
        <button title="close" onClick={onClose} className="ml-auto cursor-pointer">
          <X className="size-8 text-gray-100" />
        </button>
        </div>
        
        {children}
      </div>
    </div>
  );
}
