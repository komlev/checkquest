import { persistentAtom } from "@nanostores/persistent";
import { Interview, Section } from "../types";
import { getId } from "../utils/id";

export const $interviewsStore = persistentAtom<Interview[]>("interviews", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const addInterview = (interview: Interview) => {
  $interviewsStore.set([...$interviewsStore.get(), interview]);
};

export const updateInterview = (updatedInterview: Interview) => {
  const interviews = $interviewsStore.get();
  const index = interviews.findIndex((i) => i.id === updatedInterview.id);

  if (index !== -1) {
    const newInterviews = [...interviews];
    newInterviews[index] = updatedInterview;
    $interviewsStore.set(newInterviews);
  }
};

export const deleteInterview = (id: string) => {
  const interviews = $interviewsStore.get();
  $interviewsStore.set(interviews.filter((interview) => interview.id !== id));
};

export const getInterview = (id: string): Interview | undefined => {
  return $interviewsStore.get().find((interview) => interview.id === id);
};

export const createInterview = (
  name: string,
  checklistId: string,
  sections: Section[]
): Interview => ({
  id: getId(),
  name,
  checklistId,
  summary: "",
  sections,
  score: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
