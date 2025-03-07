import { FC } from "react";
import { Modal } from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  className?: string;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  className = "",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className={className}
      footer={
        <div className="flex justify-end sm:flex-row flex-col-reverse gap-2 w-full">
          <button
            className="btn btn-outline w-full sm:w-auto"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            aria-keyshortcuts={isOpen ? "enter" : undefined}
            className="btn btn-primary w-full sm:w-auto"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      }
    >
      <div role="alertdialog" aria-describedby="confirm-modal-message">
        <p id="confirm-modal-message">{message}</p>
      </div>
    </Modal>
  );
};
