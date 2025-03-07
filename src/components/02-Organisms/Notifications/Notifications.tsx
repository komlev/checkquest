import { useStore } from "@nanostores/react";
import { $notificationsStore } from "../../../stores/notificationsStore";
import { Notification } from "./Notification";

export const Notifications = () => {
  const list = useStore($notificationsStore);

  return (
    <ul className="toast toast-end">
      {list.map((n) => (
        <li key={n.id}>
          <Notification notification={n} />
        </li>
      ))}
    </ul>
  );
};
