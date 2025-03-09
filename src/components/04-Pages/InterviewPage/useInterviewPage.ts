import { useStore } from "@nanostores/react";
import { debounce } from "es-toolkit";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "wouter";
import { INTERVIEW_LIST } from "../../../routes";
import { $checklistsStore } from "../../../stores/checklistStore";
import {
  $interviewsStore,
  deleteInterview,
  updateInterview,
} from "../../../stores/interviewsStore";
import { Section } from "../../../types";
import { useConfirmModal } from "../../02-Organisms/ConfirmModal/useConfirmModal";

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
  const [extraScore, setExtraScore] = useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);

  useEffect(() => {
    if (interview) {
      setSections(JSON.parse(JSON.stringify(interview.sections))); // Deep copy
      setSummary(interview.summary || "");

      let currentScore = 0;
      let currentExtraScore = 0;
      let possibleScore = 0;

      interview.sections.forEach((section) => {
        section.questions.forEach((question) => {
          // Only count non-extra questions in the possible score
          if (!question.extra) {
            possibleScore += question.score;
            if (question.checked) {
              currentScore += question.score;
            }
          } else if (question.checked) {
            // Track extra points separately
            currentExtraScore += question.score;
          }
        });
      });

      setScore(currentScore);
      setExtraScore(currentExtraScore);
      setTotalPossibleScore(possibleScore);
    }
  }, [interview]);

  const debouncedSaveSummary = useMemo(
    () =>
      debounce((newSummary: string) => {
        if (interview) {
          const updatedInterview = {
            ...interview,
            summary: newSummary,
            updatedAt: new Date().toISOString(),
          };
          updateInterview(updatedInterview);
        }
      }, 400),
    [interview]
  );

  // Handle summary change with debounce
  const handleSummaryChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newSummary = e.target.value;
      setSummary(newSummary);
      debouncedSaveSummary(newSummary);
    },
    [debouncedSaveSummary]
  );

  const handleCheckQuestion = useCallback(
    (sectionIndex: number, questionIndex: number, checked: boolean) => {
      if (!interview) {
        return;
      }
      const newSections = [...sections];
      newSections[sectionIndex].questions[questionIndex].checked = checked;
      setSections(newSections);

      // Recalculate score
      let newScore = 0;
      let newExtraScore = 0;

      newSections.forEach((section) => {
        section.questions.forEach((question) => {
          if (question.checked) {
            if (!question.extra) {
              newScore += question.score;
            } else {
              newExtraScore += question.score;
            }
          }
        });
      });

      setScore(newScore);
      setExtraScore(newExtraScore);

      // Update the interview in the store
      const updatedInterview = {
        ...interview,
        sections: newSections,
        score: newScore + newExtraScore, // Total score includes extra points
        updatedAt: new Date().toISOString(),
      };

      updateInterview(updatedInterview);
    },
    [interview, sections]
  );

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
    extraScore,
    totalScore: score + extraScore,
    totalPossibleScore,
    confirmModal,
    handleSummaryChange,
    handleCheckQuestion,
    handleDelete,
  };
};
