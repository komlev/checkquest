import { describe, expect, it } from "vitest";
import type { Question, Section } from "../types";
import {
  getQuestionLabel,
  getSectionPoints,
  getSectionsPoints,
  getSectionsQuestionCount,
  getSkillLevel,
} from "./checklist";

describe("checklist utils", () => {
  const mockQuestion1: Question = {
    id: "1",
    text: "Q1",
    score: 1,
    extra: false,
  };

  const mockQuestion2: Question = {
    id: "2",
    text: "Q2",
    score: 2,
    extra: true,
  };

  const mockQuestion3: Question = {
    id: "3",
    text: "Q3",
    score: 3,
    extra: false,
  };

  const mockSection: Section = {
    id: "1",
    title: "Test Section",
    questions: [mockQuestion1, mockQuestion2, mockQuestion3],
  };

  const mockSections: Section[] = [
    mockSection,
    {
      id: "2",
      title: "Test Section 2",
      questions: [
        { id: "4", text: "Q4", score: 4, extra: false },
        { id: "5", text: "Q5", score: 5, extra: true },
      ],
    },
  ];

  describe("getSectionsQuestionCount", () => {
    it("should return 0 for empty sections", () => {
      expect(getSectionsQuestionCount([])).toBe(0);
    });

    it("should return correct count for single section", () => {
      expect(getSectionsQuestionCount([mockSection])).toBe(3);
    });

    it("should return correct count for multiple sections", () => {
      expect(getSectionsQuestionCount(mockSections)).toBe(5);
    });
  });

  describe("getSectionPoints", () => {
    it("should return 0 for empty section", () => {
      expect(
        getSectionPoints({ id: "empty", title: "Empty", questions: [] }),
      ).toBe(0);
    });

    it("should return total points for all questions when type is 'all'", () => {
      expect(getSectionPoints(mockSection, "all")).toBe(6);
    });

    it("should return points only for required questions when type is 'required'", () => {
      expect(getSectionPoints(mockSection, "required")).toBe(4);
    });

    it("should return points only for extra questions when type is 'extra'", () => {
      expect(getSectionPoints(mockSection, "extra")).toBe(2);
    });
  });

  describe("getSectionsPoints", () => {
    it("should return 0 for empty sections", () => {
      expect(getSectionsPoints([])).toBe(0);
    });

    it("should return total points for all questions when type is 'all'", () => {
      expect(getSectionsPoints(mockSections, "all")).toBe(15);
    });

    it("should return points only for required questions when type is 'required'", () => {
      expect(getSectionsPoints(mockSections, "required")).toBe(8);
    });

    it("should return points only for extra questions when type is 'extra'", () => {
      expect(getSectionsPoints(mockSections, "extra")).toBe(7);
    });
  });

  describe("getQuestionLabel", () => {
    it("should return section number only", () => {
      expect(getQuestionLabel(0)).toBe("1");
    });

    it("should return section and question numbers", () => {
      expect(getQuestionLabel(0, 1)).toBe("1.2");
    });

    it("should return section number, question number, and name", () => {
      expect(getQuestionLabel(0, 1, "Test Question")).toBe(
        "1.2. Test Question",
      );
    });
  });

  describe("getSkillLevel", () => {
    it("should return 'None' for 0 score", () => {
      expect(getSkillLevel(0, 100)).toBe("None");
    });

    it("should return 'Trainee' for score < 20%", () => {
      expect(getSkillLevel(15, 100)).toBe("Trainee");
    });

    it("should return 'Junior' for score < 40%", () => {
      expect(getSkillLevel(35, 100)).toBe("Junior");
    });

    it("should return 'Middle' for score < 70%", () => {
      expect(getSkillLevel(65, 100)).toBe("Middle");
    });

    it("should return 'Senior' for score < 90%", () => {
      expect(getSkillLevel(85, 100)).toBe("Senior");
    });

    it("should return 'Expert' for score >= 90%", () => {
      expect(getSkillLevel(95, 100)).toBe("Expert");
    });
  });
});
