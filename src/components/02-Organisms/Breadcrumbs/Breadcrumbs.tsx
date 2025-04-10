import { Link, useLocation } from "wouter";
import {
  CHECKLIST_LIST,
  INTERVIEW_LIST,
  getChecklistPage,
  getInterviewPage,
} from "../../../routes";
import { FC } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
};

export const Breadcrumbs: FC<Props> = (props) => {
  const [route] = useLocation();
  const isChecklist = route.startsWith(CHECKLIST_LIST);
  const isInterviews = route.startsWith(INTERVIEW_LIST);

  const isNew = route.endsWith("/new");
  const isEdit = route.endsWith("/edit");

  const id = route
    .replace(isChecklist ? CHECKLIST_LIST : INTERVIEW_LIST, "")
    .match(/\/(.+?)(\/|$)/i)?.[1];

  return (
    <div
      className={clsx("breadcrumbs text-sm p-1 font-medium", props.className)}
    >
      <ul>
        {isChecklist && (
          <li>
            <Link className="focusable-neutral underline" to={CHECKLIST_LIST}>
              Checklists
            </Link>
          </li>
        )}
        {isInterviews && (
          <li>
            <Link className="focusable-neutral underline" to={INTERVIEW_LIST}>
              Interviews
            </Link>
          </li>
        )}
        {id && !isNew && (
          <li>
            {isChecklist && (
              <Link
                className="focusable-neutral underline"
                to={getChecklistPage(id)}
              >
                List
              </Link>
            )}
            {isInterviews && (
              <Link
                className="focusable-neutral underline"
                to={getInterviewPage(id)}
              >
                Interview
              </Link>
            )}
          </li>
        )}
        {isNew && (
          <li>
            <span>Create</span>
          </li>
        )}
        {isEdit && (
          <li>
            <span>Edit</span>
          </li>
        )}
      </ul>
    </div>
  );
};
