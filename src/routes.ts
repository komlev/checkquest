import { stringify } from "./utils/querystring";

export const ROOT = "/";
export const CHECKLIST_LIST = "/lists";
export const CHECKLIST_NEW = "/lists/new";
export const CHECKLIST_PAGE = "/lists/:id";
export const CHECKLIST_EDIT = "/lists/:id/edit";
export const INTERVIEW_LIST = "/interviews";
export const INTERVIEW_NEW = "/interviews/new";
export const INTERVIEW_PAGE = "/interviews/:id";

export const CHECKLIST_PARAM = "checklistId";

export const getChecklistPage = (id: string) =>
  CHECKLIST_PAGE.replace(":id", id);

export const getEditChecklistPage = (id: string) =>
  CHECKLIST_EDIT.replace(":id", id);

export const getInterviewPage = (id: string) =>
  INTERVIEW_PAGE.replace(":id", id);

export const getNewInterviewPage = (checklistId?: string) =>
  INTERVIEW_NEW + stringify({ [CHECKLIST_PARAM]: checklistId }, true);
