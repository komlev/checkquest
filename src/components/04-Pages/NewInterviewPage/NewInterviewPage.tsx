import { FC } from "react";
import { useLocation, useSearchParams } from "wouter";
import {
  CHECKLIST_PARAM,
  INTERVIEW_LIST,
  getInterviewPage,
} from "../../../routes";
import { addInterview } from "../../../stores/interviewsStore";
import { Interview } from "../../../types";
import { Line } from "../../00-Atoms/Line/Line";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Heading1 } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { NewInterviewForm } from "../../02-Organisms/NewInterviewForm/NewInterviewForm";

export const NewInterviewPage: FC = () => {
  const [, setLocation] = useLocation();
  const [searchParams] = useSearchParams();
  const checklistParam = searchParams.get(CHECKLIST_PARAM);

  const onCancel = () => {
    setLocation(INTERVIEW_LIST);
  };

  const onCrate = (interview: Interview) => {
    addInterview(interview);
    setLocation(getInterviewPage(interview.id));
  };

  return (
    <Page>
      <Toolstrip>
        <Heading1>Start New Interview</Heading1>
      </Toolstrip>
      <Line />
      <NewInterviewForm
        isPage
        onClose={onCancel}
        onCreate={onCrate}
        checklistParam={checklistParam}
      />
    </Page>
  );
};
