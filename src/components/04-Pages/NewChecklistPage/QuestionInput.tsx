import clsx from "clsx";
import {
  type DragEvent,
  type FC,
  type RefObject,
  useState,
} from "preact/compat";
import type { Question, Section } from "../../../types";
import { getQuestionLabel } from "../../../utils/checklist";
import { FormControl } from "../../00-Atoms/FormControl/FormControl";
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
    extra?: boolean,
  ) => void;
  removeQuestion: (sectionIndex: number, questionIndex: number) => void;
  reorderQuestion: (
    sectionIndex: number,
    fromIndex: number,
    toIndex: number,
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

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer?.setData("text/plain", questionIndex.toString());
    if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    setDragOverIndex(questionIndex);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fromIndex = parseInt(
      e.dataTransfer?.getData("text/plain") || "0",
      10,
    );
    if (fromIndex !== questionIndex) {
      reorderQuestion(sectionIndex, fromIndex, questionIndex);
    }
    setDragOverIndex(null);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: drag and drop case
    <div
      key={question.id}
      className={clsx(
        "bg-base-200 flex gap-2 rounded-lg border p-2 shadow-xs transition-all",
        {
          "border-warning/50": !question.extra,
          "border-accent/50": question.extra,
          "opacity-50": isDragging,
          "outline-secondary/50 outline-2": dragOverIndex === questionIndex,
        },
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex cursor-grab items-center active:cursor-grabbing">
        <DragIcon className="text-base-content/50 h-4 w-4 fill-current" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
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
                  (e.target as HTMLInputElement).value,
                  question.score,
                  question.extra,
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
                  parseInt((e.target as HTMLInputElement).value, 10) || 1,
                  question.extra,
                )
              }
            />
          </FormControl>
        </div>
        <div className="-mt-6 flex items-center justify-between">
          <div className="form-control">
            <label className="label flex cursor-pointer items-center">
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
                    (e.target as HTMLInputElement).checked,
                  )
                }
              />
              <span className="label-text text-xs">Extra</span>
            </label>
          </div>
          <button
            type="button"
            className="btn btn-xs btn-warning relative z-10"
            onClick={() => removeQuestion(sectionIndex, questionIndex)}
          >
            Remove Question
          </button>
        </div>
      </div>
    </div>
  );
};
