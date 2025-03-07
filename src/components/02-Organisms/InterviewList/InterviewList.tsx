import { useStore } from "@nanostores/react";
import { atom, computed } from "nanostores";
import { FC } from "react";
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
import { Interview } from "../../../types";
import { getSectionsPoints } from "../../../utils/checklist";
import { TrashIcon } from "../../00-Atoms/Icons/TrashIcon";
import { ConfirmModal, useConfirmModal } from "../../00-Atoms/Modal";
import { Score } from "../../00-Atoms/Score/Score";
import { SkillLevel } from "../../00-Atoms/SkillLevel/SkillLevel";
import { Search } from "../../01-Molecules/Search/Search";

const $search = atom("");
const $filtered = computed([$interviewsStore, $search], (list, search) =>
  list
    .filter((c) => c?.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aDate = new Date(a.updatedAt);
      const bDate = new Date(b.updatedAt);

      return bDate.getTime() - aDate.getTime();
    })
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

  const handleDelete = (interview: Interview) => {
    onConfirmOpen({
      title: "Delete Interview",
      message: `Are you sure you want to delete "${interview.name}"?`,
      onConfirm: () => deleteInterview(interview.id),
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Search
        containerClassname="w-full md:w-60"
        value={search}
        onChange={(e) => {
          $search.set(e.target.value);
        }}
      />
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          {interviews.length ? "Finished interviews" : "No finished interviews"}
        </li>
        {interviews.map((interview) => {
          const checklist = getChecklist(interview.checklistId);
          const maxPoints = getSectionsPoints(checklist?.sections);
          const date = new Date(interview.createdAt).toLocaleDateString();
          return (
            <li key={interview.id} className="list-row items-center">
              <Score
                className="text-4xl font-thin text-warning tabular-nums"
                value={interview.score}
                maxValue={maxPoints}
              />
              <div className="flex flex-col-reverse">
                <div className="text-base-content/70 text-xs font-medium flex gap-2">
                  <time dateTime={date}>{date}</time>
                  <Score
                    value={interview.score}
                    maxValue={maxPoints}
                    asPercentage
                    aria-label="Interview Score"
                  />
                </div>
                <div className="list-col-grow flex md:flex-row flex-col text-xl md:gap-1 md:items-center">
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
              <button
                className="btn btn-square btn-ghost"
                onClick={() => handleDelete(interview)}
                aria-label="Delete Interview"
                title="Delete Interview"
              >
                <TrashIcon
                  className="fill-current text-error"
                  width={16}
                  aria-hidden="true"
                  role="presentation"
                />
              </button>
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
