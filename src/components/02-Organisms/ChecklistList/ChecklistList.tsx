import { useStore } from "@nanostores/react";
import { atom, computed } from "nanostores";
import { useState } from "react";
import { Link } from "wouter";
import { getChecklistPage, getEditChecklistPage } from "../../../routes";
import {
  $checklistsStore,
  deleteChecklist,
} from "../../../stores/checklistStore";
import { Checklist } from "../../../types";
import { getSectionsQuestionCount } from "../../../utils/checklist";
import { EditIcon } from "../../00-Atoms/Icons/EditIcon";
import { StartIcon } from "../../00-Atoms/Icons/StartIcon";
import { TrashIcon } from "../../00-Atoms/Icons/TrashIcon";
import { Search } from "../../01-Molecules/Search/Search";
import { ConfirmModal } from "../ConfirmModal";
import { useConfirmModal } from "../ConfirmModal/useConfirmModal";
import { NewInterviewModal } from "../NewInterviewModal";
import { useNewInterviewModal } from "../NewInterviewForm/useNewInterviewModal";
import { useCopyChecklist } from "../../../hooks/useCopyChecklist";
import { ClipboardIcon } from "../../00-Atoms/Icons/ClipboardIcon";

const $search = atom("");
const $filtered = computed([$checklistsStore, $search], (list, search) =>
  list.filter((c) => c?.name?.toLowerCase().includes(search.toLowerCase()))
);

export const ChecklistList = () => {
  const search = useStore($search);
  const checklists = useStore($filtered);

  const [checklistParam, setChecklistParam] = useState("");
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

  const onDelete = (id: string) => {
    onConfirmOpen({
      title: "Delete Checklist",
      message: "Are you sure you want to delete this checklist?",
      onConfirm: () => deleteChecklist(id),
    });
  };

  const onStartClick = (checklist: Checklist) => {
    setChecklistParam(checklist.id);
    onOpen();
  };

  return (
    <div className="flex flex-col gap-2">
      <Search
        id="checklist-search"
        value={search}
        containerClassname="w-full md:w-60"
        onChange={(e) => {
          $search.set(e.target.value);
        }}
      />
      <>
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            {checklists.length
              ? "Available checklists"
              : "No checklists available"}
          </li>
          {checklists.map((checklist) => (
            <li key={checklist.id} className="list-row">
              <Link className="focusable" to={getChecklistPage(checklist.id)}>
                <div
                  aria-hidden="true"
                  role="presentation"
                  className="text-4xl font-black uppercase text-warning"
                >
                  {checklist.name?.[0]}
                </div>
              </Link>
              <div>
                <div className="font-medium">
                  <Link
                    className="focusable"
                    to={getChecklistPage(checklist.id)}
                  >
                    {checklist.name}
                  </Link>
                </div>
                <div className="text-xs uppercase font-semibold opacity-60 flex gap-1">
                  {checklist.description && <div>{checklist.description}</div>}
                  <div>
                    {getSectionsQuestionCount(checklist.sections)} questions
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  id={`start-interview-btn-${checklist.id}`}
                  title="Start Interview"
                  aria-label="Start Interview"
                  className="btn btn-square btn-ghost"
                  onClick={() => onStartClick(checklist)}
                >
                  <StartIcon
                    className="fill-current"
                    width={12}
                    aria-hidden="true"
                    role="presentation"
                  />
                </button>
                <button
                  id={`copy-checklist-btn-${checklist.id}`}
                  title="Copy Checklist"
                  aria-label="Copy Checklist"
                  className="btn btn-square btn-ghost"
                  onClick={() => onCopy(checklist)}
                >
                  <ClipboardIcon
                    className="fill-current"
                    width={12}
                    aria-hidden="true"
                    role="presentation"
                  />
                </button>
                <Link
                  id={`edit-checklist-btn-${checklist.id}`}
                  to={getEditChecklistPage(checklist.id)}
                  className="btn btn-square btn-ghost"
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
                  id={`delete-checklist-btn-${checklist.id}`}
                  className="btn btn-square btn-ghost"
                  onClick={() => onDelete(checklist.id)}
                  title="Delete Checklist"
                  aria-label="Delete Checklist"
                >
                  <TrashIcon
                    className="fill-current text-error"
                    width={16}
                    aria-hidden="true"
                    role="presentation"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <NewInterviewModal
          isOpen={isOpen}
          onClose={onClose}
          checklistParam={checklistParam}
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
      </>
    </div>
  );
};
