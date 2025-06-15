import { FC, RefObject, useState } from "react";
import { Question, Section } from "../../../types";
import { FormControl } from "../../00-Atoms/FormControl/FormControl";
import clsx from "clsx";
import { getQuestionLabel } from "../../../utils/checklist";
import { DragIcon } from "../../00-Atoms/Icons/DragIcon";

type Props = {
  section: Section;
  question: Question;
  sectionIndex: number;
  questionIndex: number;
  lastInput?: RefObject<HTMLInputElement | null>;
  addQuestion: (sectionIndex: number) => void;
  updateQuestion: (
    sectionIndex: number,
    questionIndex: number,
    name: string,
    score: number,
    extra?: boolean
  ) => void;
  removeQuestion: (sectionIndex: number, questionIndex: number) => void;
  reorderQuestion: (
    sectionIndex: number,
    fromIndex: number,
    toIndex: number
  ) => void;
};

export const QuetionInput: FC<Props> = ({
  section,
  question,
  sectionIndex,
  questionIndex,
  lastInput,
  addQuestion,
  updateQuestion,
  removeQuestion,
  reorderQuestion,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", questionIndex.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(questionIndex);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (fromIndex !== questionIndex) {
      reorderQuestion(sectionIndex, fromIndex, questionIndex);
    }
    setDragOverIndex(null);
  };

  return (
    <div
      key={question.id}
      className={clsx(
        "flex gap-2 bg-base-200 shadow-xs p-2 rounded-lg border transition-all",
        {
          "border-warning/50": !question.extra,
          "border-accent/50": question.extra,
          "opacity-50": isDragging,
          "outline-2 outline-secondary/50": dragOverIndex === questionIndex,
        }
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center cursor-grab active:cursor-grabbing">
        <DragIcon className="w-4 h-4 fill-current text-base-content/50" />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex gap-2">
          <FormControl
            className="w-full"
            label={`Question ${getQuestionLabel(sectionIndex, questionIndex)}`}
          >
            <input
              type="text"
              className="input input-sm w-full"
              placeholder="Question"
              value={question.text}
              required
              aria-required="true"
              onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  addQuestion(sectionIndex);
                }
              }}
              onChange={(e) =>
                updateQuestion(
                  sectionIndex,
                  questionIndex,
                  e.target.value,
                  question.score,
                  question.extra
                )
              }
              ref={(el) => {
                if (
                  questionIndex === section.questions.length - 1 &&
                  lastInput &&
                  el
                ) {
                  lastInput.current = el;
                }
              }}
            />
          </FormControl>
          <FormControl className="fieldset w-4" label="Score" required>
            <input
              type="number"
              className="input input-sm validator"
              required
              placeholder="Question score"
              min="1"
              value={question.score}
              onChange={(e) =>
                updateQuestion(
                  sectionIndex,
                  questionIndex,
                  question.text,
                  parseInt(e.target.value) || 1,
                  question.extra
                )
              }
            />
          </FormControl>
        </div>
        <div className="flex justify-between items-center -mt-6">
          <div className="form-control">
            <label className="label cursor-pointer flex items-center">
              <input
                type="checkbox"
                className={clsx("checkbox checkbox-xs rounded-sm", {
                  "checkbox-warning": !question.extra,
                  "checkbox-accent": question.extra,
                })}
                checked={question.extra || false}
                onChange={(e) =>
                  updateQuestion(
                    sectionIndex,
                    questionIndex,
                    question.text,
                    question.score,
                    e.target.checked
                  )
                }
              />
              <span className="label-text text-xs">Extra</span>
            </label>
          </div>
          <button
            type="button"
            className="btn btn-xs relative z-10 btn-warning"
            onClick={() => removeQuestion(sectionIndex, questionIndex)}
          >
            Remove Question
          </button>
        </div>
      </div>
    </div>
  );
};
