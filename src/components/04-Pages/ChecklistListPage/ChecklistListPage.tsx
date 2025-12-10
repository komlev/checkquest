import { useStore } from "@nanostores/preact";
import { type FC, Suspense, useState } from "preact/compat";
import { Link } from "wouter";
import { $checklistsStore } from "../../../stores/checklistStore";
import { PasteIcon } from "../../00-Atoms/Icons/PasteIcon";
import { Line } from "../../00-Atoms/Line/Line";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Heading1 } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { ChecklistList } from "../../02-Organisms/ChecklistList/ChecklistList";
import { EmptyHero } from "../../02-Organisms/EmptyHero/EmptyHero";
import { ImportChecklistModal } from "../../02-Organisms/ImportChecklistModal";

export const ChecklistListPage: FC = () => {
  const checklists = useStore($checklistsStore);
  const [showImportModal, setShowImportModal] = useState(false);
  const onImport = () => setShowImportModal(true);

  return (
    <Page className="flex flex-col">
      <Toolstrip>
        <Heading1>Checklists</Heading1>
        <div className="flex gap-2">
          <button
            id="add-checklist-btn"
            type="button"
            className="btn btn-sm btn-square"
            onClick={onImport}
            title="Import Checklist"
            aria-label="Import Checklist"
          >
            <PasteIcon
              className="fill-current"
              width={16}
              aria-hidden="true"
              role="presentation"
            />
          </button>
          <Link
            id="add-checklist-btn"
            to="/lists/new"
            className="btn btn-sm btn-primary"
          >
            New Checklist
          </Link>
        </div>
      </Toolstrip>
      <Line />
      {checklists.length === 0 ? <EmptyHero /> : <ChecklistList />}
      <Suspense fallback={null}>
        <ImportChecklistModal
          isOpen={showImportModal}
          onClose={() => {
            setShowImportModal(false);
          }}
        />
      </Suspense>
    </Page>
  );
};
