import { describe, expect, it } from "vitest";
import type { Checklist, Interview, Section } from "../types";
import {
  getInterviewAnsweredQuestions,
  getInterviewSummary,
} from "./interview";

describe("getInterviewAnsweredQuestions", () => {
  it("should return 0 for empty sections", () => {
    const sections: Section[] = [];
    expect(getInterviewAnsweredQuestions(sections)).toBe(0);
  });

  it("should count answered questions across sections", () => {
    const sections: Section[] = [
      {
        id: "1",
        title: "Section 1",
        questions: [
          { id: "1", text: "Q1", checked: true, score: 1 },
          { id: "2", text: "Q2", checked: false, score: 1 },
        ],
      },
      {
        id: "2",
        title: "Section 2",
        questions: [
          { id: "3", text: "Q3", checked: true, score: 1 },
          { id: "4", text: "Q4", checked: true, score: 1 },
        ],
      },
    ];
    expect(getInterviewAnsweredQuestions(sections)).toBe(3);
  });

  it("should handle sections with no questions", () => {
    const sections: Section[] = [
      {
        id: "1",
        title: "Empty Section",
        questions: [],
      },
    ];
    expect(getInterviewAnsweredQuestions(sections)).toBe(0);
  });
});

describe("getInterviewSummary", () => {
  const mockInterview: Interview = {
    name: "Test Interview",
    score: 3,
    id: "1",
    checklistId: "1",
    summary: "Test summary",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sections: [
      {
        id: "1",
        title: "Technical",
        questions: [
          { id: "1", text: "Q1", checked: true, score: 1 },
          { id: "2", text: "Q2", checked: false, score: 1 },
        ],
      },
    ],
  };

  const mockChecklist: Checklist = {
    id: "1",
    name: "Test Checklist",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sections: [
      {
        id: "1",
        title: "Technical",
        questions: [
          { id: "1", text: "Q1", score: 1 },
          { id: "2", text: "Q2", score: 1 },
        ],
      },
    ],
  };

  it("should generate text summary with checklist", () => {
    const summary = getInterviewSummary(mockInterview, mockChecklist);
    expect(summary).toContain("Test Interview (Test Checklist)");
    expect(summary).toContain("3 out of 2");
    expect(summary).toContain("Test summary");
    expect(summary).toContain("### Technical");
    expect(summary).toContain("Q1: (answered)");
    expect(summary).toContain("Q2: (not answered)");
  });

  it("should generate text summary without checklist", () => {
    const summary = getInterviewSummary(mockInterview);
    expect(summary).toContain("Test Interview");
    expect(summary).not.toContain("Test Checklist");
  });

  it("should include extra points in summary when present", () => {
    const interviewWithExtra: Interview = {
      ...mockInterview,
      sections: [
        {
          id: "1",
          title: "Technical",
          questions: [
            { id: "1", text: "Q1", checked: true, score: 1, extra: true },
            { id: "2", text: "Q2", checked: true, score: 1 },
          ],
        },
      ],
    };
    const summary = getInterviewSummary(interviewWithExtra, mockChecklist);
    expect(summary).toContain("+ (1 extra points)");
  });

  it("should handle empty interview data", () => {
    const emptyInterview: Interview = {
      id: "1",
      checklistId: "1",
      name: "",
      score: 0,
      summary: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sections: [],
    };
    const summary = getInterviewSummary(emptyInterview);
    expect(summary).toBeDefined();
    expect(summary).toContain("0 out of 0");
  });
});
