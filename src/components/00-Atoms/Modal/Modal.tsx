import clsx from "clsx";
import { FC, ReactNode, useEffect, useRef } from "react";
import { Heading1 } from "../Typography";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const titleId = "modalTitle";

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isOpen) {
      modalElement.showModal();
      document.body.classList.add("modal-open");
    } else {
      modalElement.close();
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  return (
    <dialog
      onClose={onClose}
      ref={modalRef}
      className={clsx("modal", className)}
      aria-labelledby={titleId}
      aria-modal="true"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div className="modal-box">
        <form method="dialog">
          <button
            id="modal-close-btn"
            className="btn btn-xs btn-ghost absolute right-2 top-2"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </form>
        <Heading1 id={titleId} className="text-xl">
          {title}
        </Heading1>
        <div className="py-4">{children}</div>
        {footer && <div className="modal-action">{footer}</div>}
      </div>
    </dialog>
  );
};
