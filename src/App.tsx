import { hotkeyKeyUX, startKeyUX } from "keyux";
import type { FC } from "preact/compat";
import { useEffect } from "preact/compat";
import { themeChange } from "theme-change";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { ErrorBoundaryPage } from "./components/02-Organisms/ErrorBoundaryPage/ErrorBoundaryPage";
import { Footer } from "./components/02-Organisms/Footer/Footer";
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
import { TemplatesListPage } from "./components/04-Pages/TemplatesListPage/TemplatesListPage";
import { TemplateViewPage } from "./components/04-Pages/TemplateViewPage/TemplateViewPage";
import {
  CHECKLIST_EDIT,
  CHECKLIST_LIST,
  CHECKLIST_NEW,
  CHECKLIST_PAGE,
  INTERVIEW_LIST,
  INTERVIEW_NEW,
  INTERVIEW_PAGE,
  ROOT,
  TEMPLATE_PAGE,
  TEMPLATES_LIST,
} from "./routes";

export const App: FC = () => {
  startKeyUX(window, [hotkeyKeyUX([])]);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <Router hook={useHashLocation}>
      <div className="text-base-content flex min-h-screen flex-col">
        <Header />
        <Notifications />
        <main className="flex-grow px-2">
          <ErrorBoundaryPage>
            <Switch>
              <Route path={ROOT} component={Dashboard} />
              <Route path={CHECKLIST_LIST} component={ChecklistListPage} />
              <Route path={CHECKLIST_NEW} component={NewChecklistPage} />
              <Route path={CHECKLIST_PAGE} component={ChecklistPage} />
              <Route path={CHECKLIST_EDIT} component={NewChecklistPage} />
              <Route path={INTERVIEW_LIST} component={InterviewListPage} />
              <Route path={INTERVIEW_NEW} component={NewInterviewPage} />
              <Route path={INTERVIEW_PAGE} component={InterviewPage} />
              <Route path={TEMPLATES_LIST} component={TemplatesListPage} />
              <Route path={TEMPLATE_PAGE} component={TemplateViewPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </ErrorBoundaryPage>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
