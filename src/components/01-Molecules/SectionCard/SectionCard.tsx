import { FC } from "react";
import { Section } from "../../../types";
import { getSectionPoints } from "../../../utils/checklist";
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
      <div className="flex flex-col">
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
      </div>
      <hr className="border-t border-base-300" />
      {section.questions.length === 0 ? (
        <div className="text-center py-2">
          <Caption>No questions in this section</Caption>
        </div>
      ) : (
        <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-base-300">
          {section.questions.map((question, questionIndex) => (
            <li
              key={question.id}
              className="flex justify-between items-start p-3 bg-base-200 rounded-lg"
            >
              <div className="flex gap-2">
                <span className="font-medium text-sm">
                  {sectionIndex + 1}.{questionIndex + 1}.
                </span>
                <span className="text-sm">{question.text}</span>
              </div>
              <span className="badge badge-sm badge-warning badge-dash whitespace-nowrap">
                {question.score} pts
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
