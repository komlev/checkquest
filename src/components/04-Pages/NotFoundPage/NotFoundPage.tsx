import { Link, useLocation, useParams } from "wouter";
import { CHECKLIST_LIST, INTERVIEW_LIST, ROOT } from "../../../routes";
import { ChecklistImage } from "../../00-Atoms/ChecklistImage/ChecklistImage";
import { Heading1, Subtitle } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";

export const NotFoundPage = () => {
  const [route] = useLocation();
  const isChecklist = route.startsWith(CHECKLIST_LIST);
  const isInterviews = route.startsWith(INTERVIEW_LIST);
  const { id } = useParams();
  const isGeneral = !isChecklist && !isInterviews;

  return (
    <Page className="flex flex-col items-center gap-2">
      <Heading1 className="mt-4">
        {isChecklist && (
          <>
            Checklist <span className="text-accent">{id}</span> not found
          </>
        )}
        {isInterviews && (
          <>
            Interview <span className="text-accent">{id}</span> not found
          </>
        )}
        {isGeneral && <>Not found</>}
      </Heading1>
      <Subtitle>
        {isChecklist && <>This checklist does not exist or has been removed</>}
        {isInterviews && <>This interview does not exist or has been removed</>}
        {isGeneral && <>This page does not exist</>}
      </Subtitle>
      {(isChecklist || isInterviews) && (
        <Link
          to={isChecklist ? CHECKLIST_LIST : INTERVIEW_LIST}
          className="btn btn-primary"
        >
          Go back to list
        </Link>
      )}
      {isGeneral && (
        <Link className="btn btn-primary" to={ROOT}>
          Go back home
        </Link>
      )}
      <ChecklistImage className="h-96 w-full" />
    </Page>
  );
};
