import { FC } from "react";
import { Section } from "../../../types";
import { getQuestionLabel, getSectionPoints } from "../../../utils/checklist";
import { Line } from "../../00-Atoms/Line/Line";
import { Caption } from "../../00-Atoms/Typography/Typography";

interface SectionCardProps {
  section: Section;
  sectionIndex: number;
  onEdit?: (section: Section) => void;
}

export const SectionCard: FC<SectionCardProps> = ({
  section,
  sectionIndex,
}) => (
  <div className="card card-border border-base-300 bg-base-100 shadow-sm hover:shadow-md transition-all">
    <div className="card-body">
      <div className="flex justify-between items-start">
        <div>
          <span className="m-0 font-black text-2xl leading-none">
            {section.title}
          </span>
          <div className="text-xs text-base-content/50">
            {section.questions.length} questions
          </div>
        </div>
        <span className="badge badge-sm badge-warning whitespace-nowrap">
          {getSectionPoints(section)} pts
        </span>
      </div>
      <Line className="my-0" />
      {section.questions.length === 0 ? (
        <Caption className="text-center py-2">
          No questions in this section
        </Caption>
      ) : (
        <ul className="space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-base-300">
          {section.questions.map((question, questionIndex) => (
            <li
              key={question.id}
              className={`flex justify-between items-center rounded-lg p-3 bg-base-200 shadow-sm cursor-pointer hover:shadow-md font-medium gap-1 ${
                question.extra ? "border-l-4 border-accent" : "pl-4"
              }`}
            >
              <div className="flex gap-2 items-center">
                <span className="font-medium text-sm">
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
