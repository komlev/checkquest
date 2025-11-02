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

export const importChecklist = (encodedChecklist: string) => {
  try {
    const checklistJson = atob(encodedChecklist);
    const checklist = JSON.parse(checklistJson) as Checklist;

    if (!checklist.id) {
      return null;
    }

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
