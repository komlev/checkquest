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
    score: number,
    extra?: boolean
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
              question.score,
              question.extra
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
            className="checkbox checkbox-xs checkbox-warning rounded-sm"
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
        className="btn btn-xs btn-warning relative z-10"
        onClick={() => removeQuestion(sectionIndex, questionIndex)}
      >
        Remove Question
      </button>
    </div>
  </div>
);
