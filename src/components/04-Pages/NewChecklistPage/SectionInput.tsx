import { FC, RefObject } from "react";
import { Section } from "../../../types";
import { FormControl } from "../../00-Atoms/FormControl/FormControl";
import { TrashIcon } from "../../00-Atoms/Icons/TrashIcon";
import { Line } from "../../00-Atoms/Line/Line";
import { QuetionInput } from "./QuestionInput";

type Props = {
  section: Section;
  sectionIndex: number;
  addQuestion: (sectionIndex: number) => void;
  updateSection: (sectionIndex: number, name: string) => void;
  removeSection: (sectionIndex: number) => void;
  updateQuestion: (
    sectionIndex: number,
    questionIndex: number,
    text: string,
    score: number
  ) => void;
  sectionsLength: number;
  lastInput: RefObject<HTMLInputElement | null>;
  removeQuestion: (sectionIndex: number, questionIndex: number) => void;
};

export const SectionInput: FC<Props> = ({
  section,
  sectionIndex,
  addQuestion,
  updateSection,
  removeSection,
  lastInput,
  sectionsLength,
  removeQuestion,
  updateQuestion,
}) => (
  <div
    key={section.id}
    className="border border-primary/50 card card-sm bg-base-100 shadow-sm hover:shadow-md transition-all"
  >
    <div className="card-body">
      <div className="flex justify-between items-start">
        <FormControl
          label={`${sectionIndex + 1}. Section Name`}
          className="w-1/2"
          required
        >
          <input
            type="text"
            className="input w-full"
            placeholder="Section title"
            required
            value={section.title}
            onChange={(e) => updateSection(sectionIndex, e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                addQuestion(sectionIndex);
              }
            }}
            ref={(el) => {
              if (
                sectionIndex === sectionsLength - 1 &&
                section.questions.length === 0
              ) {
                lastInput.current = el;
              }
            }}
          />
        </FormControl>
        <button
          type="button"
          className="btn btn-sm btn-primary btn-square"
          onClick={() => removeSection(sectionIndex)}
          title="Delete Section"
          aria-label="Delete Section"
        >
          <TrashIcon
            className="fill-current"
            width={14}
            aria-hidden="true"
            role="presentation"
          />
        </button>
      </div>
      <Line className="mt-0">
        {section.questions.length ? "Questions" : "No Questions Added Yet"}
      </Line>
      {section.questions.length === 0 ? (
        <div className="text-center">
          <button
            type="button"
            className="btn btn-sm btn-warning"
            onClick={() => addQuestion(sectionIndex)}
          >
            Add First Question
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {section.questions.map((question, questionIndex) => (
            <QuetionInput
              key={question.id}
              section={section}
              question={question}
              questionIndex={questionIndex}
              sectionIndex={sectionIndex}
              addQuestion={addQuestion}
              updateQuestion={updateQuestion}
              removeQuestion={removeQuestion}
              inputRef={lastInput}
            />
          ))}
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={() => addQuestion(sectionIndex)}
            >
              Add Question
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
