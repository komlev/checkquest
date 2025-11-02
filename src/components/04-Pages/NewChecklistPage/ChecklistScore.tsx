import { type FC, memo } from "react";
import type { Section } from "../../../types";
import {
  getSectionsPoints,
  getSectionsQuestionCount,
} from "../../../utils/checklist";
import { Score } from "../../00-Atoms/Score/Score";

type Props = {
  sections: Section[];
};

export const ChecklistScore: FC<Props> = memo(({ sections }) => (
  <div>
    <div className="stat p-0">
      <div className="stat-value text-secondary">
        Score{" "}
        <Score
          value={getSectionsPoints(sections)}
          maxValue={getSectionsPoints(sections)}
        />
      </div>
      <div className="stat-title">{sections.length} Sections</div>
      <div className="stat-desc">
        {getSectionsQuestionCount(sections)} Questions
      </div>
    </div>
  </div>
));
