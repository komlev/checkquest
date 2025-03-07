import { Section } from "../types";

export const getInterviewAnsweredQuestions = (sections: Section[] = []) =>
  sections.reduce(
    (total, section) =>
      total + section.questions.filter((q) => q.checked).length,
    0
  );
