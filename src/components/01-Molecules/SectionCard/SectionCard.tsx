import { FC } from "react";
import { Section } from "../../../types";
import { getQuestionLabel, getSectionPoints } from "../../../utils/checklist";
import { Line } from "../../00-Atoms/Line/Line";
import { Caption } from "../../00-Atoms/Typography/Typography";
import clsx from "clsx";

interface SectionCardProps {
  section: Section;
  sectionIndex: number;
  onEdit?: (section: Section) => void;
}

export const SectionCard: FC<SectionCardProps> = ({
  section,
  sectionIndex,
}) => (
  <div className="card card-border border-base-300 bg-base-100 shadow-sm transition-all hover:shadow-md">
    <div className="card-body">
      <div className="flex items-start justify-between">
        <div>
          <span className="m-0 text-2xl leading-none font-black">
            {section.title}
          </span>
          <div className="text-base-content/50 text-xs">
            {section.questions.length} questions
          </div>
        </div>
        <span className="badge badge-sm badge-warning whitespace-nowrap">
          {getSectionPoints(section)} pts
        </span>
      </div>
      <Line className="my-0" />
      {section.questions.length === 0 ? (
        <Caption className="py-2 text-center">
          No questions in this section
        </Caption>
      ) : (
        <ul className="scrollbar-thin scrollbar-thumb-base-300 space-y-2 overflow-y-auto pr-2">
          {section.questions.map((question, questionIndex) => (
            <li
              key={question.id}
              className={clsx(
                "bg-base-200 flex cursor-pointer items-center justify-between gap-1 rounded-lg p-3 font-medium shadow-sm hover:shadow-md",
                question.extra ? "border-accent border-l-4" : "pl-4"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {getQuestionLabel(sectionIndex, questionIndex)}
                </span>
                <span className="text-sm">{question.text}</span>
                {question.extra && (
                  <span className="badge badge-xs badge-accent ml-1">
                    Extra
                  </span>
                )}
              </div>
              <span className="whitespace-nowrap">{question.score} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
