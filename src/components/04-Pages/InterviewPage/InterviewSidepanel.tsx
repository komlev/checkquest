import { type FC, Suspense } from "preact/compat";
import { Link } from "wouter";
import { INTERVIEW_LIST } from "../../../routes";
import type { Checklist, Section } from "../../../types";
import { Line } from "../../00-Atoms/Line/Line";
import { Score } from "../../00-Atoms/Score/Score";
import { SkillLevel } from "../../00-Atoms/SkillLevel/SkillLevel";
import { RadarChart } from "../../02-Organisms/RadarChart";

type Props = {
  summary: string;
  handleSummaryChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  checklist: Checklist;
  sections: Section[];
  score: number;
  extraScore: number;
  totalScore: number;
  totalPossibleScore: number;
};

export const InterviewSidepanel: FC<Props> = ({
  checklist,
  summary,
  handleSummaryChange,
  totalScore,
  extraScore,
  score,
  sections,
  totalPossibleScore,
}) => (
  <div className="card bg-base-100 sticky top-4 shadow-xl">
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
          className="textarea textarea-bordered h-48 w-full"
          placeholder="Notes, summary, etc."
          value={summary}
          onChange={handleSummaryChange}
          aria-label="Interview summary"
        ></textarea>
      </div>
      <Line>{checklist?.name}</Line>
      <fieldset className="stats" aria-label="Interview statistics">
        <div className="stat py-0 pr-2 pl-0">
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
      </fieldset>
      <div className="mt-4">
        <div className="mb-1 flex justify-between">
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
      <div className="mt-2">
        <Suspense fallback={<div>Loading chart...</div>}>
          <RadarChart sections={sections} />
        </Suspense>
      </div>
    </div>
  </div>
);
