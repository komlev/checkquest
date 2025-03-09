import { useStore } from "@nanostores/react";
import { computed, deepMap } from "nanostores";
import { useEffect } from "react";
import { $checklistsStore } from "../../../stores/checklistStore";
import { createInterview } from "../../../stores/interviewsStore";
import { Checklist, Interview, Section } from "../../../types";

const initialValue = {
  value: { name: "", checklist: "" },
  errors: { name: "", checklist: "" },
  tocuhed: { name: false, checklist: false },
};
const $state = deepMap(initialValue);
const $checklist = computed([$checklistsStore, $state], (list, state) =>
  list.find((c) => c.id === state.value.checklist)
);

export const useInterviewForm = (
  onCreate: (interview: Interview) => void,
  onChecklist?: (checklist?: Checklist) => void,
  checklistParam?: string | null
) => {
  const checklists = useStore($checklistsStore);
  const checklist = useStore($checklist);
  const { value, errors, tocuhed } = useStore($state);

  useEffect(() => {
    $state.set(initialValue);
  }, []);

  useEffect(() => {
    onChecklist?.(checklist);
  }, [checklist, onChecklist]);

  useEffect(() => {
    if (checklistParam) {
      $state.setKey("value.checklist", checklistParam);
    }
  }, [checklistParam]);

  const validateForm = (force?: boolean) => {
    let hasErrors = false;
    if (!value.name.trim() && (tocuhed.name || force)) {
      hasErrors = true;
      $state.setKey("errors.name", "Name is required");
    } else {
      $state.setKey("errors.name", "");
    }

    if (!checklist && (tocuhed.checklist || force)) {
      hasErrors = true;
      $state.setKey("errors.checklist", "Please select a checklist");
    } else {
      $state.setKey("errors.checklist", "");
    }
    return !hasErrors;
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line
  }, [value.name, value.checklist, tocuhed.name, tocuhed.checklist]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(true) || !checklist) {
      return;
    }

    const interviewSections: Section[] = checklist.sections.map((section) => ({
      ...section,
      questions: section.questions.map((question) => ({
        ...question,
        checked: false,
      })),
    }));

    const interview = createInterview(
      value.name,
      checklist.id,
      interviewSections
    );
    onCreate(interview);
  };

  return {
    handleSubmit,
    errors,
    value,
    $state,
    checklists,
  };
};
