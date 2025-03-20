import { Link, useLocation } from "wouter";
import {
  CHECKLIST_LIST,
  INTERVIEW_LIST,
  ROOT,
  getChecklistPage,
  getInterviewPage,
} from "../../../routes";

export const Breadcrumbs = () => {
  const [route] = useLocation();
  const isChecklist = route.startsWith(CHECKLIST_LIST);
  const isInterviews = route.startsWith(INTERVIEW_LIST);

  const isNew = route.endsWith("/new");
  const isEdit = route.endsWith("/edit");

  const id = route
    .replace(isChecklist ? CHECKLIST_LIST : INTERVIEW_LIST, "")
    .match(/\/(.+?)(\/|$)/i)?.[1];

  return (
    <div className="breadcrumbs text-sm p-1">
      <ul>
        <li>
          <Link className="focusable" to={ROOT}>
            Home
          </Link>
        </li>
        {isChecklist && (
          <li>
            <Link className="focusable" to={CHECKLIST_LIST}>
              Checklists
            </Link>
          </li>
        )}
        {isInterviews && (
          <li>
            <Link className="focusable" to={INTERVIEW_LIST}>
              Interviews
            </Link>
          </li>
        )}
        {id && !isNew && (
          <li>
            {isChecklist && (
              <Link className="focusable" to={getChecklistPage(id)}>
                List
              </Link>
            )}
            {isInterviews && (
              <Link className="focusable" to={getInterviewPage(id)}>
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
