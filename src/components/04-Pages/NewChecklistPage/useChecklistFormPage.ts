import { useCallback, useLayoutEffect, useRef, useState } from "preact/compat";
import { useLocation, useParams } from "wouter";
import { getChecklistPage } from "../../../routes";
import {
  addChecklist,
  getChecklist,
  updateChecklist,
} from "../../../stores/checklistStore";
import type { Checklist, Question, Section } from "../../../types";
import { getId } from "../../../utils/id";

export const useChecklistFormPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams<{ id: string }>();
  const isEditMode = Boolean(params?.id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [errors, setErrors] = useState<{ name?: string; sections?: string }>(
    {},
  );

  // Add a ref to track the latest question input
  const lastInput = useRef<HTMLInputElement | null>(null);
  const selectedSection = useRef(-1);

  // Load existing checklist data if in edit mode
  useLayoutEffect(() => {
    if (isEditMode && params?.id) {
      const existingChecklist = getChecklist(params.id);
      if (existingChecklist) {
        setName(existingChecklist.name);
        setDescription(existingChecklist.description || "");
        setSections(JSON.parse(JSON.stringify(existingChecklist.sections)));
      }
    }
  }, [isEditMode, params?.id]);

  const focusOnLastInput = useCallback((sectionIndex: number) => {
    selectedSection.current = sectionIndex;
    setTimeout(() => {
      if (lastInput.current) {
        lastInput.current.focus();
        selectedSection.current = -2;
      }
    }, 0);
  }, []);

  const addSection = useCallback(() => {
    const newSection: Section = {
      id: getId(),
      title: "",
      questions: [],
    };
    const sectionIndex = sections.length;
    setSections([...sections, newSection]);
    focusOnLastInput(sectionIndex);
  }, [sections, focusOnLastInput]);

  const updateSection = useCallback(
    (index: number, title: string) => {
      setSections(sections.map((s, i) => (i !== index ? s : { ...s, title })));
    },
    [sections],
  );

  const removeSection = useCallback(
    (index: number) => {
      setSections(sections.filter((_, i) => i !== index));
    },
    [sections],
  );

  const addQuestion = useCallback(
    (sectionIndex: number) => {
      const newQuestion: Question = {
        id: getId(),
        text: "",
        score: 1,
        extra: false,
      };
      setSections(
        sections.map((s, i) =>
          i !== sectionIndex
            ? s
            : { ...s, questions: [...s.questions, newQuestion] },
        ),
      );
      focusOnLastInput(sectionIndex);
    },
    [sections, focusOnLastInput],
  );

  const updateQuestion = useCallback(
    (
      sectionIndex: number,
      questionIndex: number,
      text: string,
      score: number,
      extra?: boolean,
    ) => {
      setSections(
        sections.map((s, si) =>
          si !== sectionIndex
            ? s
            : {
                ...s,
                questions: s.questions.map((q, qi) =>
                  qi !== questionIndex
                    ? q
                    : { ...q, text, score, extra: extra ?? false },
                ),
              },
        ),
      );
    },
    [sections],
  );

  const removeQuestion = useCallback(
    (sectionIndex: number, questionIndex: number) => {
      setSections(
        sections.map((s, si) =>
          si !== sectionIndex
            ? s
            : {
                ...s,
                questions: s.questions.filter((_, qi) => qi !== questionIndex),
              },
        ),
      );
    },
    [sections],
  );

  const reorderQuestion = useCallback(
    (sectionIndex: number, fromIndex: number, toIndex: number) => {
      setSections(
        sections.map((s, si) => {
          if (si !== sectionIndex) return s;
          const questions = [...s.questions];
          const [moved] = questions.splice(fromIndex, 1);
          questions.splice(toIndex, 0, moved);
          return { ...s, questions };
        }),
      );
    },
    [sections],
  );

  const validateForm = () => {
    const newErrors: { name?: string; sections?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (sections.length === 0) {
      newErrors.sections = "Add at least one section";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Validate sections have titles and questions
    const validSections = sections.filter(
      (section) => section.title.trim() !== "",
    );

    // Filter out questions with empty text
    const processedSections = validSections.map((section) => ({
      ...section,
      questions: section.questions.filter((q) => q.text.trim() !== ""),
    }));

    const now = new Date().toISOString();

    if (isEditMode && params?.id) {
      // Update existing checklist
      const updatedChecklist: Checklist = {
        id: params.id,
        name,
        description: description.trim() || undefined,
        sections: processedSections,
        updatedAt: now,
        createdAt: getChecklist(params.id)?.createdAt || now,
      };

      updateChecklist(updatedChecklist);
      setLocation(getChecklistPage(params.id));
    } else {
      // Create new checklist
      const newChecklist: Checklist = {
        id: getId(),
        name,
        description: description.trim() || undefined,
        sections: processedSections,
        createdAt: now,
        updatedAt: now,
      };

      addChecklist(newChecklist);
      setLocation(getChecklistPage(newChecklist.id));
    }
  };

  return {
    isEditMode,
    sections,
    lastInput,
    errors,
    name,
    description,
    selectedSection: selectedSection.current,
    handleSubmit,
    addSection,
    updateSection,
    addQuestion,
    updateQuestion,
    removeSection,
    removeQuestion,
    reorderQuestion,
    setName,
    setDescription,
    setLocation,
  };
};
