import { useLayoutEffect, useRef, useState } from "react";
import { useLocation, useParams } from "wouter";
import { getChecklistPage } from "../../../routes";
import {
  addChecklist,
  getChecklist,
  updatechecklist,
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

  const addSection = () => {
    const newSection: Section = {
      id: getId(),
      title: "",
      questions: [],
    };
    const sectionIndex = sections.length;
    setSections([...sections, newSection]);
    focusOnLastInput(sectionIndex);
  };

  const updateSection = (index: number, title: string) => {
    const updatedSections = [...sections];
    updatedSections[index].title = title;
    setSections(updatedSections);
  };

  const removeSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const addQuestion = (sectionIndex: number) => {
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
  };

  const updateQuestion = (
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
  };

  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.splice(questionIndex, 1);
    setSections(updatedSections);
  };

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

      updatechecklist(updatedChecklist);
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
    setName,
    setDescription,
    setLocation,
  };
};
