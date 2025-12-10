import { type FC, memo } from "preact/compat";
import type { Section } from "../../../types";
import { Subtitle } from "../../00-Atoms/Typography";
import { InterviewSectionCard } from "../../02-Organisms/InterviewSectionCard/InterviewSectionCard";

type Props = {
  sections: Section[];
  onCheckQuestion: (
    sectionIndex: number,
    questionIndex: number,
    checked: boolean,
  ) => void;
};

export const SectionsList: FC<Props> = memo(({ sections, onCheckQuestion }) => (
  <>
    {sections.length === 0 ? (
      <Subtitle className="text-center">Checklist is empty</Subtitle>
    ) : (
      sections.map((section, sectionIndex) => (
        <InterviewSectionCard
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
          onCheckQuestion={(questionIndex, checked) =>
            onCheckQuestion(sectionIndex, questionIndex, checked)
          }
        />
      ))
    )}
  </>
));
