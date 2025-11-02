import { atom } from "nanostores";
import type { ReactNode } from "react";
import { getId } from "../utils/id";

export type TYPE = "success" | "info" | "error";

export type Notification = {
  id: string;
  content: ReactNode;
  type: TYPE;
};

export const $notificationsStore = atom<Notification[]>([]);

export const addNotification = (content: ReactNode, type: TYPE = "info") => {
  $notificationsStore.set([
    ...$notificationsStore.get(),
    { id: getId(), content, type },
  ]);
};

export const removeNotification = (id: string) => {
  $notificationsStore.set([
    ...$notificationsStore.get().filter((n) => n.id !== id),
  ]);
};
