import { useStore } from "@nanostores/react";
import { FC } from "react";
import { $interviewsStore } from "../../../stores/interviewsStore";
import { Line } from "../../00-Atoms/Line/Line";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Heading1 } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { EmptyHero } from "../../02-Organisms/EmptyHero/EmptyHero";
import { InterviewList } from "../../02-Organisms/InterviewList/InterviewList";
import { NewInterviewModal } from "../../02-Organisms/NewInterviewForm/NewInterviewModal";
import { useNewInterviewModal } from "../../02-Organisms/NewInterviewForm/useNewInterviewModal";

export const InterviewListPage: FC = () => {
  const interviews = useStore($interviewsStore);
  const { isOpen, onClose, onOpen } = useNewInterviewModal();

  return (
    <Page className="flex flex-col">
      <Toolstrip>
        <Heading1>Interviews</Heading1>
        <button onClick={onOpen} className="btn btn-sm btn-primary">
          New Interview
        </button>
      </Toolstrip>
      <Line />
      {interviews.length === 0 ? <EmptyHero /> : <InterviewList />}
      <NewInterviewModal isOpen={isOpen} onClose={onClose} />
    </Page>
  );
};
