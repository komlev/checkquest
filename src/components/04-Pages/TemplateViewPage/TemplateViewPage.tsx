import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "wouter";
import { getChecklistPage } from "../../../routes";
import { addChecklist } from "../../../stores/checklistStore";
import { Checklist } from "../../../types";
import { getId } from "../../../utils/id";
import { Line } from "../../00-Atoms/Line/Line";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Caption, Heading1 } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { ChecklistGrid } from "../../02-Organisms/ChecklistGrid/ChecklistGrid";
import { ErrorPage } from "../../02-Organisms/ErrorBoundaryPage/ErrorPage";

type Template = Checklist & {
  path?: string;
};

export const TemplateViewPage: FC = () => {
  const params = useParams<{ slug: string }>();
  const [template, setTemplate] = useState<Template | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const src = useMemo(() => `/templates/${params.slug}.json`, [params.slug]);

  useEffect(() => {
    setError(null);
    setTemplate(null);
    fetch(src)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data: Template) => setTemplate(data))
      .catch(() => setError("Failed to load template"));
  }, [src]);

  const onCopy = () => {
    if (!template) return;
    const now = new Date().toISOString();
    const newChecklist: Checklist = {
      id: getId(),
      name: template.name,
      description: template.description,
      sections: template.sections,
      createdAt: now,
      updatedAt: now,
    };
    addChecklist(newChecklist);
    setLocation(getChecklistPage(newChecklist.id));
  };

  if (error) {
    return <ErrorPage />;
  }

  const totalQuestions = template?.sections.reduce(
    (acc, s) => acc + s.questions.length,
    0
  );

  return (
    <Page className="flex flex-col">
      {template && (
        <>
          <Toolstrip>
            <div className="flex flex-col gap-1">
              <Heading1>{template.name}</Heading1>
              {template.description && (
                <Caption>{template.description}</Caption>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="badge badge-sm badge-warning">
                  {template.sections.length} sections
                </span>
                <span className="badge badge-sm badge-warning">
                  {totalQuestions} questions
                </span>
              </div>
            </div>
            <div className="flex w-full justify-end gap-2 md:w-auto">
              <button className="btn btn-sm btn-primary" onClick={onCopy}>
                Copy to My Checklists
              </button>
            </div>
          </Toolstrip>
          <Line>Preview</Line>
          <ChecklistGrid sections={template.sections} />
        </>
      )}
    </Page>
  );
};
