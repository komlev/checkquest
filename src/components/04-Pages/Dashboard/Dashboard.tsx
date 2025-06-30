import { useStore } from "@nanostores/react";
import { FC } from "react";
import { Link } from "wouter";
import { CHECKLIST_NEW } from "../../../routes";
import { $checklistsStore } from "../../../stores/checklistStore";
import { $interviewsStore } from "../../../stores/interviewsStore";
import { Page } from "../../01-Molecules/Page/Page";
import { InterviewList } from "../../02-Organisms/InterviewList/InterviewList";
import { useNewInterviewModal } from "../../02-Organisms/NewInterviewForm/useNewInterviewModal";
import { NewInterviewModal } from "../../02-Organisms/NewInterviewModal";
import { Heading2 } from "../../00-Atoms/Typography";
import { ChecklistImage } from "../../00-Atoms/ChecklistImage/ChecklistImage";

export const Dashboard: FC = () => {
  const interviews = useStore($interviewsStore);
  const checklists = useStore($checklistsStore);
  const isNoInterviews = !interviews.length;
  const isNoChecklists = !checklists.length;

  const { isOpen, onOpen, onClose } = useNewInterviewModal();

  return (
    <Page className="flex flex-col">
      <div className="flex flex-col items-center gap-2 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-2 md:mt-20 md:w-1/2 md:items-start">
          <h1 className="text-center text-5xl font-black md:text-start">
            CheckQuest!
          </h1>
          <div className="text-center text-3xl font-bold md:text-start">
            Interviewer Checklists Manager
          </div>
          <p className="text-base-content/60 mt-4 text-center md:text-start">
            CheckQuest allows you to create, customize, and organize detailed
            checklists tailored to interview needs, ensuring no critical
            question or evaluation point is missed. Maintain consistency across
            interviews, and make data-driven decisions with ease.
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              id="add-checklist-btn"
              href={CHECKLIST_NEW}
              className="btn btn-sm btn-warning"
            >
              Create a Checklist
            </Link>
            {!isNoChecklists && (
              <>
                <span className="text-base-content/60 mt-0.5">or</span>
                <button
                  id="add-interview-btn"
                  onClick={onOpen}
                  className="btn btn-sm btn-accent"
                >
                  Create an Interview
                </button>
              </>
            )}
          </div>
        </div>
        <div className="md:w-1/2">
          <ChecklistImage className="w-full" />
        </div>
      </div>
      {!isNoInterviews && (
        <>
          <Heading2 className="my-2">Recent Interviews</Heading2>
          <InterviewList />
        </>
      )}
      <NewInterviewModal isOpen={isOpen} onClose={onClose} />
    </Page>
  );
};
