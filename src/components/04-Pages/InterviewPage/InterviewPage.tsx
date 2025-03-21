import { FC } from "react";
import { Link } from "wouter";
import { INTERVIEW_LIST } from "../../../routes";
import { TrashIcon } from "../../00-Atoms/Icons/TrashIcon";
import { Line } from "../../00-Atoms/Line/Line";
import { Score } from "../../00-Atoms/Score/Score";
import { SkillLevel } from "../../00-Atoms/SkillLevel/SkillLevel";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Caption, Heading1, Subtitle } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { ConfirmModal } from "../../02-Organisms/ConfirmModal";
import { InterviewSectionCard } from "../../02-Organisms/InterviewSectionCard/InterviewSectionCard";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
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

  if (!interview) {
    return <NotFoundPage />;
  }

  const date = new Date(interview.createdAt).toLocaleDateString();

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section
          className="lg:col-span-2"
          aria-labelledby="interview-sections-heading"
        >
          <h2 id="interview-sections-heading" className="sr-only">
            Interview Sections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.length === 0 ? (
              <Subtitle className="text-center">Checklist is empty</Subtitle>
            ) : (
              <>
                {sections.map((section, sectionIndex) => (
                  <InterviewSectionCard
                    key={section.id}
                    section={section}
                    sectionIndex={sectionIndex}
                    onCheckQuestion={(questionIndex, checked) =>
                      handleCheckQuestion(sectionIndex, questionIndex, checked)
                    }
                  />
                ))}
              </>
            )}
          </div>
        </section>
        <section
          className="interview-summary"
          aria-labelledby="interview-summary-heading"
        >
          <div className="card bg-base-100 shadow-xl sticky top-4">
            <div className="card-body">
              <h2 id="interview-summary-heading" className="card-title">
                Summary
              </h2>
              <div className="form-control w-full">
                <label htmlFor="interview-summary" className="sr-only">
                  Interview summary
                </label>
                <textarea
                  id="interview-summary"
                  className="textarea textarea-bordered h-48"
                  placeholder="Notes, summary, etc."
                  value={summary}
                  onChange={handleSummaryChange}
                  aria-label="Interview summary"
                ></textarea>
              </div>
              <Line>{checklist?.name}</Line>
              <div
                className="stats"
                role="group"
                aria-label="Interview statistics"
              >
                <div className="stat py-0 pl-0 pr-2">
                  <div className="stat-title">Score</div>
                  <Score
                    className="stat-value text-warning"
                    value={totalScore}
                    maxValue={totalPossibleScore}
                  />
                  <div className="stat-desc">
                    {score} + {extraScore} extra = {totalScore} points
                  </div>
                </div>
                <div className="stat py-0 pr-0 pl-2">
                  <div className="stat-title">Estimated level</div>
                  <div className="stat-desc">
                    <SkillLevel
                      className="stat-value text-secondary"
                      score={totalScore}
                      maxPoints={totalPossibleScore}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span id="progress-label">Progress</span>
                  <Score
                    value={totalScore}
                    maxValue={totalPossibleScore}
                    asPercentage
                  />
                </div>
                <progress
                  className="progress progress-secondary w-full"
                  value={totalScore}
                  max={totalPossibleScore}
                  aria-labelledby="progress-label"
                ></progress>
              </div>
              <Link
                id="complete-interview"
                to={INTERVIEW_LIST}
                className="btn btn-primary"
              >
                Complete
              </Link>
            </div>
          </div>
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
