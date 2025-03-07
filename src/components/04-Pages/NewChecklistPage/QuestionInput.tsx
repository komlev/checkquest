import { FC, RefObject } from "react";
import { Question, Section } from "../../../types";
import { FormControl } from "../../00-Atoms/FormControl/FormControl";

type Props = {
  section: Section;
  question: Question;
  sectionIndex: number;
  questionIndex: number;
  inputRef: RefObject<HTMLInputElement | null>;
  addQuestion: (sectionIndex: number) => void;
  updateQuestion: (
    sectionIndex: number,
    questionIndex: number,
    name: string,
    score: number
  ) => void;
  removeQuestion: (sectionIndex: number, questionIndex: number) => void;
};

export const QuetionInput: FC<Props> = ({
  section,
  question,
  sectionIndex,
  questionIndex,
  inputRef,
  addQuestion,
  updateQuestion,
  removeQuestion,
}) => (
  <div
    key={question.id}
    className="flex flex-col gap-1 bg-base-200 shadow-xs p-2 rounded-lg border border-warning/50"
  >
    <div className="flex gap-2">
      <FormControl
        className="w-full"
        label={`Question ${sectionIndex + 1}.${questionIndex + 1}`}
        required
      >
        <input
          type="text"
          className="input input-sm w-full"
          placeholder="Question"
          value={question.text}
          required
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
              question.score
            )
          }
          ref={(el) => {
            if (questionIndex === section.questions.length - 1 && inputRef) {
              inputRef.current = el;
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
              parseInt(e.target.value) || 1
            )
          }
        />
      </FormControl>
    </div>
    <div className="text-right -mt-6">
      <button
        type="button"
        className="btn btn-xs btn-warning relative z-10"
        onClick={() => removeQuestion(sectionIndex, questionIndex)}
      >
        Remove Question
      </button>
    </div>
  </div>
);
