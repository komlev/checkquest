import clsx from "clsx";
import type { FC } from "react";
import type { Section } from "../../../types";
import { Body, Heading2 } from "../../00-Atoms/Typography/Typography";
import { SectionCard } from "../../01-Molecules/SectionCard/SectionCard";

interface ChecklistGridProps {
  sections?: Section[];
  className?: string;
}

export const ChecklistGrid: FC<ChecklistGridProps> = ({
  sections = [],
  className = "",
}) => {
  if (sections.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <Heading2 className="card-title">
            No sections in this checklist
          </Heading2>
          <Body className="mb-4">Add sections to get started</Body>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {sections.map((section, sectionIndex) => (
        <SectionCard
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
        />
      ))}
    </div>
  );
};
