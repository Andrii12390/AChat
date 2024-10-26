import { X } from "lucide-react";
import { ReactNode } from "react";


interface ModalProps {
  isOpen: boolean;        
  handleClose: VoidFunction; 
  children: ReactNode;       
}

export const Modal = ({ isOpen, handleClose, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-100 dark:bg-black opacity-50 transition-all blur-xl" />
      )}
      <div
        onClick={handleClose}
        className={`fixed inset-0 flex justify-center items-center transition-all ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`rounded-md min-w-28 shadow-md transition-all duration-300 ${
            isOpen ? "scale-100 opacity-100" : "scale-100 opacity-0"
          }`}
        >
          <button
            onClick={handleClose}
            className={`absolute top-1 right-1 p-1 transition-colors duration-300 rounded-md hover:bg-gray-50 hover:text-black/90`}
          >
            <X />
          </button>
          <div className="pt-3 bg-slate-50 dark:bg-neutral-900 rounded-md">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
