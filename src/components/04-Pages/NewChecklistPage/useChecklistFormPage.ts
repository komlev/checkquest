import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useParams } from "wouter";
import { getChecklistPage } from "../../../routes";
import {
  addChecklist,
  getChecklist,
  updateChecklist,
} from "../../../stores/checklistStore";
import { Checklist, Question, Section } from "../../../types";
import { getId } from "../../../utils/id";

export const useChecklistFormPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams<{ id: string }>();
  const isEditMode = Boolean(params?.id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [errors, setErrors] = useState<{ name?: string }>({});

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
        setSections(existingChecklist.sections);
      }
    }
  }, [isEditMode, params?.id]);

  const focusOnLastInput = (sectionIndex: number) => {
    selectedSection.current = sectionIndex;
    setTimeout(() => {
      if (lastInput.current) {
        lastInput.current.focus();
        selectedSection.current = -2;
      }
    }, 0);
  };

  const addSection = useCallback(() => {
    const newSection: Section = {
      id: getId(),
      title: "",
      questions: [],
    };
    const sectionIndex = sections.length;
    setSections([...sections, newSection]);
    focusOnLastInput(sectionIndex);
  }, [sections]);

  const updateSection = useCallback(
    (index: number, title: string) => {
      const updatedSections = [...sections];
      updatedSections[index].title = title;
      setSections(updatedSections);
    },
    [sections]
  );

  const removeSection = useCallback(
    (index: number) => {
      const updatedSections = [...sections];
      updatedSections.splice(index, 1);
      setSections(updatedSections);
    },
    [sections]
  );

  const addQuestion = useCallback(
    (sectionIndex: number) => {
      const updatedSections = [...sections];
      const newQuestion: Question = {
        id: getId(),
        text: "",
        score: 1,
        extra: false,
      };
      updatedSections[sectionIndex].questions.push(newQuestion);
      setSections(updatedSections);
      focusOnLastInput(sectionIndex);
    },
    [sections]
  );

  const updateQuestion = useCallback(
    (
      sectionIndex: number,
      questionIndex: number,
      text: string,
      score: number,
      extra?: boolean
    ) => {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].questions[questionIndex].text = text;
      updatedSections[sectionIndex].questions[questionIndex].score = score;
      updatedSections[sectionIndex].questions[questionIndex].extra =
        extra ?? false;
      setSections(updatedSections);
    },
    [sections]
  );

  const removeQuestion = useCallback(
    (sectionIndex: number, questionIndex: number) => {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].questions.splice(questionIndex, 1);
      setSections(updatedSections);
    },
    [sections]
  );

  const reorderQuestion = useCallback(
    (sectionIndex: number, fromIndex: number, toIndex: number) => {
      const updatedSections = [...sections];
      const questions = [...updatedSections[sectionIndex].questions];
      const [moved] = questions.splice(fromIndex, 1);
      questions.splice(toIndex, 0, moved);
      updatedSections[sectionIndex].questions = questions;
      setSections(updatedSections);
    },
    [sections]
  );

  const validateForm = () => {
    const newErrors: { name?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
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
      (section) => section.title.trim() !== ""
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
