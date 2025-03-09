import { FC, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getChecklistPage } from "../../../routes";
import { importChecklist } from "../../../stores/checklistStore";
import { addNotification } from "../../../stores/notificationsStore";
import { FormControl } from "../../00-Atoms/FormControl/FormControl";
import { Modal } from "../../00-Atoms/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ImportChecklistModal: FC<Props> = ({ isOpen, onClose }) => {
  const [value, setValue] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isOpen) {
      setValue("");
    }
  }, [isOpen]);

  const onImport = () => {
    const id = importChecklist(value);
    if (id) {
      addNotification("Imported successfully");
      onClose();
      setLocation(getChecklistPage(id));
    } else {
      addNotification("Import error. Corrupted string", "error");
    }
  };

  return (
    <Modal
      footer={
        <button className="btn btn-primary" onClick={onImport}>
          Import
        </button>
      }
      title="Import checklist"
      isOpen={isOpen}
      onClose={onClose}
    >
      <FormControl label="Checklist string" required>
        <textarea
          required
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Checklist"
          className="textarea textarea-xs w-full"
        ></textarea>
      </FormControl>
    </Modal>
  );
};
