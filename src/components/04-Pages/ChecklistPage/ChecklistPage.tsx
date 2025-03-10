import { FC } from "react";
import { Link, useLocation, useParams } from "wouter";
import { CHECKLIST_LIST, getEditChecklistPage } from "../../../routes";
import {
  deleteChecklist,
  exportChecklist,
  getChecklist,
} from "../../../stores/checklistStore";
import { addNotification } from "../../../stores/notificationsStore";
import {
  getSectionsPoints,
  getSectionsQuestionCount,
} from "../../../utils/checklist";
import { ClipboardIcon } from "../../00-Atoms/Icons/ClipboardIcon";
import { EditIcon } from "../../00-Atoms/Icons/EditIcon";
import { TrashIcon } from "../../00-Atoms/Icons/TrashIcon";
import { Line } from "../../00-Atoms/Line/Line";
import { ConfirmModal, useConfirmModal } from "../../00-Atoms/Modal";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Caption, Heading1 } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { ChecklistGrid } from "../../02-Organisms/ChecklistGrid/ChecklistGrid";
import { NewInterviewModal } from "../../02-Organisms/NewInterviewForm/NewInterviewModal";
import { useNewInterviewModal } from "../../02-Organisms/NewInterviewForm/useNewInterviewModal";
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

  if (!checklist) {
    return <NotFoundPage />;
  }

  const handleDelete = () => {
    onConfirmOpen({
      title: "Delete Checklist",
      message: "Are you sure you want to delete this checklist?",
      onConfirm: () => {
        deleteChecklist(id);
        setLocation(CHECKLIST_LIST);
      },
    });
  };

  const handleCopy = async () => {
    const content = exportChecklist(checklist.id);
    if (content) {
      try {
        await navigator.clipboard.writeText(content);
        addNotification("Copied to clipboard");
        return;
      } catch (_err) {
        //
      }
    }
    addNotification("Export failed", "error");
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
          <div className="flex gap-2 mt-2">
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
        <div className="flex gap-2 justify-between w-full md:w-auto">
          <button onClick={onOpen} className="btn btn-sm btn-primary">
            Start Interview
          </button>
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-square"
              onClick={handleCopy}
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
              className="btn btn-error btn-sm btn-outline btn-square"
              onClick={handleDelete}
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
