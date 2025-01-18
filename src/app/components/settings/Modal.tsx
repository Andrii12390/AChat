import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  handleClose: VoidFunction;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, handleClose, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-muted blur-xl" />
      )}
      <div
        onClick={handleClose}
        className={`fixed inset-0 flex justify-center items-center ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`rounded-md min-w-28 shadow-md ${
            isOpen ? "scale-100 opacity-100" : "scale-100 opacity-0"
          }`}
        >
          <button
            onClick={handleClose}
            className={`absolute top-1 right-1 p-1 transition-colors rounded-md hover:bg-hover`}
          >
            <X />
          </button>
          <div className="pt-3 rounded-md bg-modal border border-border">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
