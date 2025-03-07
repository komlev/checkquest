import { FC, useMemo } from "react";
import { Line } from "../../00-Atoms/Line/Line";
import { Heading2, Subtitle } from "../../00-Atoms/Typography";
import { Section } from "../../../types";

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
  const { checkedCount, totalCount } = useMemo(() => {
    const checked = section.questions.filter((q) => q.checked).length;
    const total = section.questions.length;
    return { checkedCount: checked, totalCount: total };
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
    <div className="mb-8 card shadow-md">
      <div className="card-body">
        <div className="flex justify-between items-start gap-2">
          <Heading2 className="text-xl font-bold mb-4">
            {sectionIndex + 1}. {section.title}
          </Heading2>
          <div className="flex flex-col items-end gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-warning"
              checked={allChecked}
              onChange={(e) => handleSectionCheckboxChange(e.target.checked)}
              disabled={totalCount === 0}
            />
            <div>
              {totalCount > 0 && (
                <span className="text-sm text-gray-500">
                  {checkedCount}/{totalCount}
                </span>
              )}
            </div>
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
              <li
                key={question.id}
                className="flex justify-between items-center rounded-lg p-3 bg-base-200 shadow-sm cursor-pointer hover:shadow-md font-medium"
                onClick={() =>
                  onCheckQuestion(questionIndex, !question.checked)
                }
              >
                <div className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                    checked={question.checked || false}
                    onChange={(e) =>
                      onCheckQuestion(questionIndex, e.target.checked)
                    }
                    // Prevent the click event from bubbling up to the li element
                    // This prevents double-toggling when clicking directly on the checkbox
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span>
                    {sectionIndex + 1}.{questionIndex + 1}. {question.text}
                  </span>
                </div>
                <span>{question.score} pts</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
