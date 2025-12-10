import clsx from "clsx";
import { type FC, useMemo } from "preact/compat";
import type { Section } from "../../../types";
import { getQuestionLabel } from "../../../utils/checklist";
import { Line } from "../../00-Atoms/Line/Line";
import { Heading2, Subtitle } from "../../00-Atoms/Typography";

interface InterviewSectionCardProps {
  section: Section;
  sectionIndex: number;
  onCheckQuestion: (questionIndex: number, checked: boolean) => void;
}

export const InterviewSectionCard: FC<InterviewSectionCardProps> = ({
  section,
  sectionIndex,
  onCheckQuestion,
}) => {
  // Calculate the number of checked questions and total questions
  const { checkedCount, totalCount, extraCount } = useMemo(() => {
    const checked = section.questions.filter((q) => q.checked).length;
    const total = section.questions.length;
    const extra = section.questions.filter((q) => q.extra).length;
    return {
      checkedCount: checked,
      totalCount: total,
      extraCount: extra,
    };
  }, [section.questions]);

  // Check if all questions are checked
  const allChecked = checkedCount === totalCount && totalCount > 0;

  // Handle section checkbox change
  const handleSectionCheckboxChange = (checked: boolean) => {
    // Update all questions in this section
    section.questions.forEach((_, index) => {
      onCheckQuestion(index, checked);
    });
  };

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex items-start justify-between gap-2">
          <div className="mb-4 flex flex-col">
            <Heading2
              id={`section-name-${sectionIndex}`}
              className="text-xl font-bold"
            >
              {getQuestionLabel(sectionIndex, undefined, section.title)}
            </Heading2>
            <div>
              {totalCount > 0 && (
                <span className="text-sm text-gray-500">
                  {checkedCount}/{totalCount}
                  {extraCount > 0 && ` (${extraCount} extra)`}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <input
              id={`full-section-checkbox-${sectionIndex}`}
              aria-label={`Select full ${section.title} section`}
              type="checkbox"
              className="checkbox checkbox-warning"
              checked={allChecked}
              onChange={(e) =>
                handleSectionCheckboxChange(
                  (e.target as HTMLInputElement).checked,
                )
              }
              disabled={totalCount === 0}
            />
          </div>
        </div>
        <Line className="mt-0 mb-2" />
        {section.questions.length === 0 ? (
          <Subtitle className="text-center">
            No questions in this section
          </Subtitle>
        ) : (
          <ul className="flex flex-col gap-2">
            {section.questions.map((question, questionIndex) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: does not have negative impact on accessibility
              <li
                key={question.id}
                className={clsx(
                  "bg-base-200 flex cursor-pointer items-center justify-between gap-2 rounded-lg p-3 font-medium shadow-sm hover:shadow-md",
                  question.extra && "border-accent border-l-4",
                )}
                onClick={() =>
                  onCheckQuestion(questionIndex, !question.checked)
                }
              >
                <div className="flex items-center gap-3">
                  <input
                    id={`question-checkbox-${sectionIndex}-${questionIndex}`}
                    aria-label={question.text}
                    type="checkbox"
                    className={clsx(
                      `checkbox`,
                      question.extra ? "checkbox-accent" : "checkbox-warning",
                    )}
                    checked={question.checked || false}
                    onChange={(e) =>
                      onCheckQuestion(
                        questionIndex,
                        (e.target as HTMLInputElement).checked,
                      )
                    }
                    // Prevent the click event from bubbling up to the li element
                    // This prevents double-toggling when clicking directly on the checkbox
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="flex items-center gap-2">
                    {getQuestionLabel(
                      sectionIndex,
                      questionIndex,
                      question.text,
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {question.extra && (
                    <span className="badge badge-xs badge-accent">Extra</span>
                  )}
                  <span className="whitespace-nowrap">
                    {question.score} pts
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
