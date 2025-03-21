import clsx from "clsx";
import { FC, useEffect } from "react";
import {
  Notification as NotificationType,
  removeNotification,
} from "../../../stores/notificationsStore";

type Props = {
  notification: NotificationType;
};

export const Notification: FC<Props> = ({ notification }) => {
  useEffect(() => {
    const id = setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);

    return () => {
      clearTimeout(id);
    };
  }, [notification.id]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={clsx("alert flex justify-between", {
        ["alert-success"]: notification.type === "success",
        ["alert-error"]: notification.type === "error",
      })}
    >
      <span>{notification.content}</span>
      <button
        title="Close notification"
        aria-label="Close notification"
        className="btn btn-xs btn-ghost"
        onClick={() => removeNotification(notification.id)}
      >
        ✕
      </button>
    </div>
  );
};
