import { Checklist, Interview, Section } from "../types";
import { getSectionsPoints, getSkillLevel } from "./checklist";

export const getInterviewAnsweredQuestions = (sections: Section[] = []) =>
  sections.reduce(
    (total, section) =>
      total + section.questions.filter((q) => q.checked).length,
    0
  );

type EXPORT_TYPE = "TEXT";

const getTextSummary = (interview: Interview, checklist?: Checklist) => {
  const date = new Date(interview.updatedAt);
  const maxPoints = getSectionsPoints(checklist?.sections, "required");
  const checklistName = checklist?.name ? ` (${checklist.name})` : "";
  const strings = [
    `${interview.name}${checklistName} on ${date.toLocaleDateString()}`,
    `# Summary: ${getSkillLevel(interview.score, maxPoints)} - ${
      interview.score
    } out of ${maxPoints}`,
    "---",
    interview.summary,
    "## Questions",
    ...interview.sections.map((s) =>
      [
        `### ${s.title}`,
        ...s.questions
          .sort((a, b) => (!!a?.checked > !!b?.checked ? -1 : 1))
          .map(
            (q) => `${q.text}: (${q.checked ? "answered" : "not answered"})`
          ),
      ].join("\n")
    ),
  ];
  return strings.filter(Boolean).join("\n");
};

export const getInterviewSummary = (
  interview: Interview,
  checklist?: Checklist,
  format: EXPORT_TYPE = "TEXT"
) => {
  switch (format) {
    case "TEXT": {
      return getTextSummary(interview, checklist);
    }
    default:
      return "";
  }
};
