import { persistentAtom } from "@nanostores/persistent";
import type { Checklist } from "../types";
import { getId } from "../utils/id";

export const $checklistsStore = persistentAtom<Checklist[]>("checklists", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const addChecklist = (checklist: Checklist) => {
  $checklistsStore.set([...$checklistsStore.get(), checklist]);
};

export const updateChecklist = (updatedChecklist: Checklist) => {
  const checklists = $checklistsStore.get();
  const index = checklists.findIndex((kb) => kb.id === updatedChecklist.id);

  if (index !== -1) {
    const newChecklists = [...checklists];
    newChecklists[index] = updatedChecklist;
    $checklistsStore.set(newChecklists);
  }
};

export const deleteChecklist = (id: string) => {
  const checklists = $checklistsStore.get();
  $checklistsStore.set(checklists.filter((kb) => kb.id !== id));
};

export const getChecklist = (id: string): Checklist | undefined => {
  return $checklistsStore.get().find((kb) => kb.id === id);
};

export const exportChecklist = (id: string) => {
  const checklist = getChecklist(id);
  if (!checklist) {
    return null;
  }
  const checklistJson = JSON.stringify(checklist);
  return btoa(checklistJson);
};

const isValidChecklist = (value: unknown): value is Checklist => {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  if (typeof c.id !== "string" || !c.id) return false;
  if (typeof c.name !== "string" || !c.name) return false;
  if (typeof c.createdAt !== "string") return false;
  if (typeof c.updatedAt !== "string") return false;
  if (!Array.isArray(c.sections)) return false;
  for (const section of c.sections) {
    if (!section || typeof section !== "object") return false;
    const s = section as Record<string, unknown>;
    if (typeof s.id !== "string") return false;
    if (typeof s.title !== "string") return false;
    if (!Array.isArray(s.questions)) return false;
    for (const question of s.questions) {
      if (!question || typeof question !== "object") return false;
      const q = question as Record<string, unknown>;
      if (typeof q.id !== "string") return false;
      if (typeof q.text !== "string") return false;
      if (typeof q.score !== "number") return false;
    }
  }
  return true;
};

export const importChecklist = (encodedChecklist: string) => {
  try {
    const checklistJson = atob(encodedChecklist);
    const parsed: unknown = JSON.parse(checklistJson);

    if (!isValidChecklist(parsed)) {
      return null;
    }

    const checklist: Checklist = { ...parsed };

    // Check if a checklist with the same ID already exists
    const existingChecklist = getChecklist(checklist.id);
    if (existingChecklist) {
      checklist.id = getId();
      checklist.name = `${checklist.name} (Copy)`;
    }

    addChecklist(checklist);

    return checklist.id;
  } catch (_err) {
    return null;
  }
};
