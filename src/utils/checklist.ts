import { Section } from "../types";

type COUNT = "all" | "required" | "extra";

export const getSectionsQuestionCount = (sections: Section[] = []) =>
  sections.reduce((total, section) => total + section.questions.length, 0);

export const getSectionsPoints = (
  sections: Section[] = [],
  type: COUNT = "all"
) => sections.reduce((acc, s) => getSectionPoints(s, type) + acc, 0);

export const getSectionPoints = (section: Section, type: COUNT = "all") =>
  section.questions
    .filter((q) => {
      return (
        type === "all" ||
        (q.extra && type === "extra") ||
        (!q.extra && type === "required")
      );
    })
    .reduce((total, q) => total + q.score, 0);

export const getQuestionLabel = (
  sectionIndex: number,
  questionIndex?: number,
  questionName?: string
) => {
  let result = `${sectionIndex + 1}`;
  if (questionIndex !== undefined) {
    result += `.${questionIndex + 1}`;
  }

  if (questionName !== undefined) {
    result += `. ${questionName}`;
  }

  return result;
};

export const getSkillLevel = (score: number, maxPoints: number) =>
  score === 0
    ? "None"
    : score < maxPoints * 0.2
      ? "Trainee"
      : score < maxPoints * 0.4
        ? "Junior"
        : score < maxPoints * 0.7
          ? "Middle"
          : score < maxPoints * 0.9
            ? "Senior"
            : "Expert";
