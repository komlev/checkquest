import { useStore } from "@nanostores/preact";
import { type FC, Suspense } from "preact/compat";
import { CHECKLIST_NEW } from "../../../routes";
import { $checklistsStore } from "../../../stores/checklistStore";
import { Hero } from "../../01-Molecules/Hero/Hero";
import { useNewInterviewModal } from "../NewInterviewForm/useNewInterviewModal";
import { NewInterviewModal } from "../NewInterviewModal";

export const EmptyHero: FC = () => {
  const checklists = useStore($checklistsStore);
  const hasChecklists = !!checklists.length;

  const { isOpen, onClose, onOpen } = useNewInterviewModal();

  return (
    <Hero
      title={hasChecklists ? "No interviews yet" : "No checklists yet"}
      button={hasChecklists ? "Create an interview" : "Add a checklist"}
      buttonId={hasChecklists ? "add-interview-btn" : "add-checklist-btn"}
      location={hasChecklists ? undefined : CHECKLIST_NEW}
      onClick={hasChecklists ? onOpen : undefined}
    >
      <img className="w-full" src="/landing.svg" alt="Checklist" />
      {hasChecklists
        ? "Start by creating your first interview"
        : "Start by creating or importing checklists"}

      <Suspense fallback={null}>
        <NewInterviewModal isOpen={isOpen} onClose={onClose} />
      </Suspense>
    </Hero>
  );
};
