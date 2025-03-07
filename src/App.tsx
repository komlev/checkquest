import { hotkeyKeyUX, startKeyUX } from "keyux";
import { FC, useEffect } from "react";
import { themeChange } from "theme-change";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Caption } from "./components/00-Atoms/Typography";
import { Header } from "./components/02-Organisms/Header/Header";
import { Notifications } from "./components/02-Organisms/Notifications/Notifications";
import { ChecklistListPage } from "./components/04-Pages/ChecklistListPage/ChecklistListPage";
import { ChecklistPage } from "./components/04-Pages/ChecklistPage/ChecklistPage";
import { Dashboard } from "./components/04-Pages/Dashboard/Dashboard";
import { InterviewListPage } from "./components/04-Pages/InterviewListPage/InterviewListPage";
import { InterviewPage } from "./components/04-Pages/InterviewPage/InterviewPage";
import { NewChecklistPage } from "./components/04-Pages/NewChecklistPage/NewChecklistPage";
import { NewInterviewPage } from "./components/04-Pages/NewInterviewPage/NewInterviewPage";
import { NotFoundPage } from "./components/04-Pages/NotFoundPage/NotFoundPage";
import {
  CHECKLIST_EDIT,
  CHECKLIST_LIST,
  CHECKLIST_NEW,
  CHECKLIST_PAGE,
  INTERVIEW_LIST,
  INTERVIEW_NEW,
  INTERVIEW_PAGE,
  ROOT,
} from "./routes";

export const App: FC = () => {
  startKeyUX(window, [hotkeyKeyUX([])]);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <Router hook={useHashLocation}>
      <main className="text-base-content">
        <div className="min-h-screen flex flex-col">
          <Header />
          <Notifications />
          <div className="flex-grow px-2">
            <Switch>
              <Route path={ROOT} component={Dashboard} />
              <Route path={CHECKLIST_LIST} component={ChecklistListPage} />
              <Route path={CHECKLIST_NEW} component={NewChecklistPage} />
              <Route path={CHECKLIST_PAGE} component={ChecklistPage} />
              <Route path={CHECKLIST_EDIT} component={NewChecklistPage} />
              <Route path={INTERVIEW_LIST} component={InterviewListPage} />
              <Route path={INTERVIEW_NEW} component={NewInterviewPage} />
              <Route path={INTERVIEW_PAGE} component={InterviewPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
        <footer
          className="footer footer-center py-4 bg-base-300"
          role="contentinfo"
        >
          <Caption className="flex font-medium">
            CheckQuest by{" "}
            <a
              className="link"
              target="_blank"
              href="https://komlev.me"
              rel="noopener noreferrer"
              aria-label="Visit komlev's website"
            >
              komlev
            </a>
          </Caption>
        </footer>
      </main>
    </Router>
  );
};
