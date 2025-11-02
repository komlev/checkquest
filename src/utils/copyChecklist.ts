import { exportChecklist } from "../stores/checklistStore";
import { addNotification } from "../stores/notificationsStore";
import type { Checklist } from "../types";

export const copyChecklist = async (checklist: Checklist) => {
  const content = exportChecklist(checklist.id);
  if (content) {
    try {
      await navigator.clipboard.writeText(content);
      addNotification("Copied to clipboard");
      return;
    } catch (_err) {
      //
    }
  }
  addNotification("Export failed", "error");
};
