import { Section } from "../types";

export const getSectionsQuestionCount = (sections: Section[] = []) =>
  sections.reduce((total, section) => total + section.questions.length, 0);

export const getSectionsPoints = (sections: Section[] = []) =>
  sections.reduce((acc, s) => getSectionPoints(s) + acc, 0);

export const getSectionPoints = (section: Section) =>
  section.questions.reduce((total, q) => total + q.score, 0);
