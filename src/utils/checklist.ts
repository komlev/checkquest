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
