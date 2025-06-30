import { FC } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useCopyChecklist } from "../../../hooks/useCopyChecklist";
import { CHECKLIST_LIST, getEditChecklistPage } from "../../../routes";
import { deleteChecklist, getChecklist } from "../../../stores/checklistStore";
import {
  getSectionsPoints,
  getSectionsQuestionCount,
} from "../../../utils/checklist";
import { ClipboardIcon } from "../../00-Atoms/Icons/ClipboardIcon";
import { EditIcon } from "../../00-Atoms/Icons/EditIcon";
import { TrashIcon } from "../../00-Atoms/Icons/TrashIcon";
import { Line } from "../../00-Atoms/Line/Line";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Caption, Heading1 } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { ChecklistGrid } from "../../02-Organisms/ChecklistGrid/ChecklistGrid";
import { ConfirmModal } from "../../02-Organisms/ConfirmModal";
import { useConfirmModal } from "../../02-Organisms/ConfirmModal/useConfirmModal";
import { useNewInterviewModal } from "../../02-Organisms/NewInterviewForm/useNewInterviewModal";
import { NewInterviewModal } from "../../02-Organisms/NewInterviewModal";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";

export const ChecklistPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const checklist = getChecklist(id);
  const [, setLocation] = useLocation();
  const { isOpen, onClose, onOpen } = useNewInterviewModal();
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
    title,
    message,
    onConfirm,
    confirmText,
    cancelText,
  } = useConfirmModal();

  const { onCopy } = useCopyChecklist();

  if (!checklist) {
    return <NotFoundPage />;
  }

  const onDelete = () => {
    onConfirmOpen({
      title: "Delete Checklist",
      message: "Are you sure you want to delete this checklist?",
      onConfirm: () => {
        deleteChecklist(id);
        setLocation(CHECKLIST_LIST);
      },
    });
  };

  const totalQuestions = getSectionsQuestionCount(checklist.sections);
  const totalScore = getSectionsPoints(checklist.sections);
  const extraTotalScore = getSectionsPoints(checklist.sections, "extra");

  return (
    <Page className="flex flex-col">
      <Toolstrip>
        <div className="flex flex-col gap-1">
          <Heading1>{checklist.name}</Heading1>
          {checklist.description && <Caption>{checklist.description}</Caption>}
          <div className="mt-2 flex gap-2">
            <span className="badge badge-sm badge-warning">
              {checklist.sections.length} sections
            </span>
            <span className="badge badge-sm badge-warning">
              {totalQuestions} questions
            </span>
            <span className="badge badge-sm badge-warning">
              {totalScore} points
            </span>
            {extraTotalScore > 0 && (
              <span className="badge badge-sm badge-accent">
                {extraTotalScore} extra points
              </span>
            )}
          </div>
        </div>
        <div className="flex w-full justify-between gap-2 md:w-auto">
          <button
            id="add-interview-btn"
            onClick={onOpen}
            className="btn btn-sm btn-primary"
          >
            Start Interview
          </button>
          <div className="flex gap-2">
            <button
              id="copy-checklist-btn"
              className="btn btn-sm btn-square"
              onClick={() => onCopy(checklist)}
              title="Export Checklist"
              aria-label="Export Checklist"
            >
              <ClipboardIcon
                className="fill-current"
                width={12}
                aria-hidden="true"
                role="presentation"
              />
            </button>
            <Link
              id="edit-checklist-btn"
              to={getEditChecklistPage(id)}
              className="btn btn-sm btn-square"
              title="Edit Checklist"
              aria-label="Edit Checklist"
            >
              <EditIcon
                className="fill-current"
                width={16}
                aria-hidden="true"
                role="presentation"
              />
            </Link>
            <button
              id="delete-checklist-btn"
              className="btn btn-error btn-sm btn-outline btn-square"
              onClick={onDelete}
              title="Delete Checklist"
              aria-label="Delete Checklist"
            >
              <TrashIcon
                className="fill-current"
                width={14}
                aria-hidden="true"
                role="presentation"
              />
            </button>
          </div>
        </div>
      </Toolstrip>
      <Line>Questions</Line>
      <ChecklistGrid sections={checklist.sections} />
      <NewInterviewModal
        isOpen={isOpen}
        onClose={onClose}
        checklistParam={checklist.id}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        onConfirm={onConfirm}
        title={title}
        message={message}
        confirmText={confirmText}
        cancelText={cancelText}
      />
    </Page>
  );
};
