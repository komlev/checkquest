import clsx from "clsx";
import type { FC } from "preact/compat";
import { Link, useLocation } from "wouter";
import {
  CHECKLIST_LIST,
  getChecklistPage,
  getInterviewPage,
  getTemplatePage,
  INTERVIEW_LIST,
  TEMPLATES_LIST,
} from "../../../routes";

type Props = {
  className?: string;
};

export const Breadcrumbs: FC<Props> = (props) => {
  const [route] = useLocation();
  const isChecklist = route.startsWith(CHECKLIST_LIST);
  const isInterviews = route.startsWith(INTERVIEW_LIST);
  const isTemplate = route.startsWith(TEMPLATES_LIST);

  const isNew = route.endsWith("/new");
  const isEdit = route.endsWith("/edit");

  const id = route
    .replace(
      isChecklist
        ? CHECKLIST_LIST
        : isTemplate
          ? TEMPLATES_LIST
          : INTERVIEW_LIST,
      "",
    )
    .match(/\/(.+?)(\/|$)/i)?.[1];

  return (
    <div
      className={clsx(
        "breadcrumbs hidden p-1 text-sm font-medium md:flex",
        props.className,
      )}
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
        {isTemplate && (
          <li>
            <Link className="focusable-neutral underline" to={TEMPLATES_LIST}>
              Templates
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
            {isTemplate && (
              <Link
                className="focusable-neutral underline"
                to={getTemplatePage(id)}
              >
                Template
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
