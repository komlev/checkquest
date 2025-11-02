import { useStore } from "@nanostores/react";
import { atom, computed } from "nanostores";
import type { FC } from "react";
import { Link } from "wouter";
import {
  CHECKLIST_LIST,
  getChecklistPage,
  getInterviewPage,
} from "../../../routes";
import { getChecklist } from "../../../stores/checklistStore";
import {
  $interviewsStore,
  deleteInterview,
} from "../../../stores/interviewsStore";
import { addNotification } from "../../../stores/notificationsStore";
import type { Checklist, Interview } from "../../../types";
import { getSectionsPoints } from "../../../utils/checklist";
import { getInterviewSummary } from "../../../utils/interview";
import { ClipboardIcon } from "../../00-Atoms/Icons/ClipboardIcon";
import { TrashIcon } from "../../00-Atoms/Icons/TrashIcon";
import { Score } from "../../00-Atoms/Score/Score";
import { SkillLevel } from "../../00-Atoms/SkillLevel/SkillLevel";
import { Search } from "../../01-Molecules/Search/Search";
import { ConfirmModal } from "../ConfirmModal";
import { useConfirmModal } from "../ConfirmModal/useConfirmModal";

const $search = atom("");
const $filtered = computed([$interviewsStore, $search], (list, search) =>
  list
    .filter((c) => c?.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aDate = new Date(a.updatedAt);
      const bDate = new Date(b.updatedAt);

      return bDate.getTime() - aDate.getTime();
    }),
);

export const InterviewList: FC = () => {
  const search = useStore($search);
  const interviews = useStore($filtered);
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

  const onDelete = (interview: Interview) => {
    onConfirmOpen({
      title: "Delete Interview",
      message: `Are you sure you want to delete "${interview.name}"?`,
      onConfirm: () => deleteInterview(interview.id),
    });
  };

  const onCopy = async (interview: Interview, checklist?: Checklist) => {
    const content = getInterviewSummary(interview, checklist);
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

  return (
    <div className="flex flex-col gap-2">
      <Search
        id="interview-search"
        containerClassname="w-full md:w-60"
        value={search}
        onChange={(e) => {
          $search.set(e.target.value);
        }}
      />
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
          {interviews.length ? "Finished interviews" : "No finished interviews"}
        </li>
        {interviews.map((interview) => {
          const checklist = getChecklist(interview.checklistId);
          const maxPoints = getSectionsPoints(checklist?.sections, "required");
          const date = new Date(interview.createdAt).toLocaleDateString();
          return (
            <li key={interview.id} className="list-row flex items-center">
              <Score
                className="text-warning text-4xl font-thin tabular-nums"
                value={interview.score}
                maxValue={maxPoints}
              />
              <div className="flex grow flex-col-reverse">
                <div className="text-base-content/70 flex gap-2 text-xs font-medium">
                  <time dateTime={date}>{date}</time>
                  <Score
                    value={interview.score}
                    maxValue={maxPoints}
                    asPercentage
                    aria-label="Interview Score"
                  />
                </div>
                <div className="list-col-grow flex flex-col text-xl md:flex-row md:items-center md:gap-1">
                  <Link
                    to={getInterviewPage(interview.id)}
                    className="link link-hover"
                  >
                    {interview.name}
                  </Link>
                  <span
                    className="text-neutral-content hidden md:block"
                    aria-hidden="true"
                    role="presentation"
                  >
                    |
                  </span>
                  <Link
                    to={
                      checklist?.id
                        ? getChecklistPage(checklist?.id)
                        : CHECKLIST_LIST
                    }
                    className="link link-hover text-secondary"
                  >
                    {checklist?.name}
                  </Link>
                  <span
                    className="text-neutral-content hidden md:block"
                    aria-hidden="true"
                    role="presentation"
                  >
                    |
                  </span>
                  <SkillLevel
                    className="text-warning"
                    score={interview.score}
                    maxPoints={maxPoints}
                  />
                </div>
              </div>
              <div className="flex shrink flex-wrap gap-1">
                <button
                  id={`delete-interview-btn-${interview.id}`}
                  type="button"
                  className="btn btn-square btn-ghost"
                  onClick={() => onCopy(interview, checklist)}
                  aria-label="Export Interview Summary"
                  title="Export Interview Summary"
                >
                  <ClipboardIcon
                    className="fill-current"
                    width={12}
                    aria-hidden="true"
                    role="presentation"
                  />
                </button>
                <button
                  id={`delete-interview-btn-${interview.id}`}
                  type="button"
                  className="btn btn-square btn-ghost"
                  onClick={() => onDelete(interview)}
                  aria-label="Delete Interview"
                  title="Delete Interview"
                >
                  <TrashIcon
                    className="text-error fill-current"
                    width={16}
                    aria-hidden="true"
                    role="presentation"
                  />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        onConfirm={onConfirm}
        title={title}
        message={message}
        confirmText={confirmText}
        cancelText={cancelText}
      />
    </div>
  );
};
