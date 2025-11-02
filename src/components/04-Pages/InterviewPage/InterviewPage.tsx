import { type FC, useMemo } from "react";
import { TrashIcon } from "../../00-Atoms/Icons/TrashIcon";
import { Line } from "../../00-Atoms/Line/Line";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Caption, Heading1 } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { ConfirmModal } from "../../02-Organisms/ConfirmModal";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { InterviewSidepanel } from "./InterviewSidepanel";
import { SectionsList } from "./SectionsList";
import { useInterviewPage } from "./useInterviewPage";

export const InterviewPage: FC = () => {
  const {
    score,
    extraScore,
    totalScore,
    sections,
    summary,
    checklist,
    interview,
    totalPossibleScore,
    confirmModal,
    handleSummaryChange,
    handleCheckQuestion,
    handleDelete: onDelete,
  } = useInterviewPage();

  const date = useMemo(
    () =>
      interview?.createdAt
        ? new Date(interview.createdAt).toLocaleDateString()
        : "",
    [interview?.createdAt],
  );

  if (!interview || !checklist) {
    return <NotFoundPage />;
  }

  return (
    <Page className="flex flex-col gap-2">
      <Toolstrip>
        <div className="flex flex-col">
          <Heading1>{interview.name}</Heading1>
          <Caption>
            <time dateTime={date}>{date}</time>
          </Caption>
        </div>
        <button
          id="delete-interview-btn"
          type="button"
          className="btn btn-sm btn-error btn-outline btn-square"
          onClick={onDelete}
          title="Delete Interview"
          aria-label="Delete Interview"
        >
          <TrashIcon
            className="fill-current"
            width={16}
            aria-hidden="true"
            role="presentation"
          />
        </button>
      </Toolstrip>
      <Line className="mt-0" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section
          className="lg:col-span-2"
          aria-labelledby="interview-sections-heading"
        >
          <h2 id="interview-sections-heading" className="sr-only">
            Interview Sections
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <SectionsList
              sections={sections}
              onCheckQuestion={handleCheckQuestion}
            />
          </div>
        </section>
        <section
          className="interview-summary"
          aria-labelledby="interview-summary-heading"
        >
          <InterviewSidepanel
            summary={summary}
            handleSummaryChange={handleSummaryChange}
            checklist={checklist}
            sections={sections}
            score={score}
            extraScore={extraScore}
            totalScore={totalScore}
            totalPossibleScore={totalPossibleScore}
          />
        </section>
      </div>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
      />
    </Page>
  );
};
