import { type FC, useEffect, useState } from "preact/compat";
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

const ImportChecklistModal: FC<Props> = ({ isOpen, onClose }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isOpen) {
      setValue("");
      setLoading(false);
    }
  }, [isOpen]);

  const onImport = () => {
    if (!value.trim()) {
      addNotification("Please enter a checklist string", "error");
      return;
    }
    setLoading(true);
    const id = importChecklist(value);
    setLoading(false);
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={onImport}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : null}
          Import
        </button>
      }
      title="Import checklist"
      isOpen={isOpen}
      onClose={onClose}
    >
      <FormControl label="Checklist string">
        <textarea
          required
          aria-required="true"
          value={value}
          onChange={(e) => {
            setValue((e.target as HTMLTextAreaElement).value);
          }}
          placeholder="Checklist"
          className="textarea textarea-xs w-full"
        ></textarea>
      </FormControl>
    </Modal>
  );
};

export default ImportChecklistModal;
