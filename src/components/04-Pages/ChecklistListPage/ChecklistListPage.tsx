import { useStore } from "@nanostores/react";
import { FC, useState } from "react";
import { Link } from "wouter";
import { $checklistsStore } from "../../../stores/checklistStore";
import { Line } from "../../00-Atoms/Line/Line";
import { Page } from "../../01-Molecules/Page/Page";
import { ChecklistList } from "../../02-Organisms/ChecklistList/ChecklistList";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Heading1 } from "../../00-Atoms/Typography";
import { EmptyHero } from "../../02-Organisms/EmptyHero/EmptyHero";
import { ImportChecklistModal } from "../../02-Organisms/ImportChecklistModal/ImportChecklistModal";
import { PasteIcon } from "../../00-Atoms/Icons/PasteIcon";

export const ChecklistListPage: FC = () => {
  const checklists = useStore($checklistsStore);
  const [showImportModal, setShowImportModal] = useState(false);
  const handleImport = () => {
    setShowImportModal(true);
  };

  return (
    <Page className="flex flex-col">
      <Toolstrip>
        <Heading1>Checklists</Heading1>
        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-square"
            onClick={handleImport}
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
          <Link to="/lists/new" className="btn btn-sm btn-primary">
            New Checklist
          </Link>
        </div>
      </Toolstrip>
      <Line />
      {checklists.length === 0 ? <EmptyHero /> : <ChecklistList />}
      <ImportChecklistModal
        isOpen={showImportModal}
        onClose={() => {
          setShowImportModal(false);
        }}
      />
    </Page>
  );
};
