import { useCallback, useEffect, useMemo, useState } from "react";
import { Section } from "../../../types";
import { useStore } from "@nanostores/react";
import { useLocation, useParams } from "wouter";
import {
  $interviewsStore,
  deleteInterview,
  updateInterview,
} from "../../../stores/interviewsStore";
import { $checklistsStore } from "../../../stores/checklistStore";
import { INTERVIEW_LIST } from "../../../routes";
import { useConfirmModal } from "../../../components/00-Atoms/Modal";

export const useInterviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const interviews = useStore($interviewsStore);
  const checklists = useStore($checklistsStore);
  const confirmModal = useConfirmModal();

  const interview = useMemo(
    () => interviews.find((i) => i.id === id),
    [interviews, id]
  );
  const checklist = interview
    ? checklists.find((c) => c.id === interview.checklistId)
    : null;

  const [sections, setSections] = useState<Section[]>([]);
  const [summary, setSummary] = useState("");
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);

  useEffect(() => {
    if (interview) {
      setSections(JSON.parse(JSON.stringify(interview.sections))); // Deep copy
      setSummary(interview.summary || "");

      let currentScore = 0;
      let possibleScore = 0;

      interview.sections.forEach((section) => {
        section.questions.forEach((question) => {
          possibleScore += question.score;
          if (question.checked) {
            currentScore += question.score;
          }
        });
      });

      setScore(currentScore);
      setTotalPossibleScore(possibleScore);
    }
  }, [interview]);

  // eslint-disable-next-line
  const debouncedSaveSummary = useCallback(
    (() => {
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      return (newSummary: string) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          if (interview) {
            const updatedInterview = {
              ...interview,
              summary: newSummary,
              updatedAt: new Date().toISOString(),
            };
            updateInterview(updatedInterview);
          }
        }, 400);
      };
    })(),
    [interview]
  );

  // Handle summary change with debounce
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSummary = e.target.value;
    setSummary(newSummary);
    debouncedSaveSummary(newSummary);
  };

  const handleCheckQuestion = (
    sectionIndex: number,
    questionIndex: number,
    checked: boolean
  ) => {
    if (!interview) {
      return;
    }
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex].checked = checked;
    setSections(newSections);

    // Recalculate score
    let newScore = 0;
    newSections.forEach((section) => {
      section.questions.forEach((question) => {
        if (question.checked) {
          newScore += question.score;
        }
      });
    });

    setScore(newScore);

    // Update the interview in the store
    const updatedInterview = {
      ...interview,
      sections: newSections,
      score: newScore,
      updatedAt: new Date().toISOString(),
    };

    updateInterview(updatedInterview);
  };

  const handleDelete = () => {
    confirmModal.onOpen({
      title: "Delete Interview",
      message: "Are you sure you want to delete this interview?",
      onConfirm: () => {
        deleteInterview(id);
        setLocation(INTERVIEW_LIST);
      },
    });
  };

  return {
    interview,
    checklist,
    sections,
    summary,
    score,
    totalPossibleScore,
    handleSummaryChange,
    handleCheckQuestion,
    handleDelete,
    confirmModal,
  };
};
