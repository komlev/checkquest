import { FC } from "react";
import { Modal } from "../../00-Atoms/Modal";
import { NewInterviewForm } from "../NewInterviewForm/NewInterviewForm";
import { useLocation } from "wouter";
import { Interview } from "../../../types";
import { addInterview } from "../../../stores/interviewsStore";
import { getInterviewPage } from "../../../routes";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  checklistParam?: string;
};

const NewInterviewModal: FC<Props> = ({ isOpen, onClose, checklistParam }) => {
  const [, setLocation] = useLocation();

  const onCreate = (interview: Interview) => {
    addInterview(interview);
    setLocation(getInterviewPage(interview.id));
  };

  return (
    <Modal title="Start Interview" isOpen={isOpen} onClose={onClose}>
      <NewInterviewForm
        checklistParam={checklistParam}
        onCreate={onCreate}
        onClose={onClose}
      />
    </Modal>
  );
};

export default NewInterviewModal;
