import { FC } from "react";
import { CHECKLIST_LIST } from "../../../routes";
import {
  getSectionsPoints,
  getSectionsQuestionCount,
} from "../../../utils/checklist";
import { FormControl } from "../../00-Atoms/FormControl/FormControl";
import { Line } from "../../00-Atoms/Line/Line";
import { Score } from "../../00-Atoms/Score/Score";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Heading1 } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { SectionInput } from "./SectionInput";
import { useChecklistFormPage } from "./useChecklistFormPage";

export const NewChecklistPage: FC = () => {
  const {
    description,
    errors,
    isEditMode,
    lastInput,
    name,
    sections,
    addQuestion,
    addSection,
    handleSubmit,
    updateQuestion,
    removeQuestion,
    removeSection,
    setDescription,
    setLocation,
    setName,
    updateSection,
  } = useChecklistFormPage();

  return (
    <Page>
      <Toolstrip>
        <Heading1>{isEditMode ? "Edit Checklist" : "New Checklist"}</Heading1>
      </Toolstrip>
      <Line />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {sections.length === 0 ? (
              <div className="flex flex-col items-center gap-2">
                <div className="text-xl font-medium">No sections added yet</div>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addSection}
                  >
                    Add Section
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-1 gap-4">
                  {sections.map((section, sectionIndex) => (
                    <SectionInput
                      addQuestion={addQuestion}
                      removeQuestion={removeQuestion}
                      updateQuestion={updateQuestion}
                      section={section}
                      removeSection={removeSection}
                      updateSection={updateSection}
                      sectionIndex={sectionIndex}
                      sectionsLength={sections.length}
                      lastInput={lastInput}
                    />
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={addSection}
                  >
                    Add Section
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="card card-sm shadow-lg h-fit sticky top-2">
            <div className="card-body flex flex-col gap-2">
              <FormControl label="Checklist name" error={errors.name} required>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl label="Checklist description">
                <textarea
                  className="textarea h-24 w-full"
                  placeholder="Description"
                  value={description}
                  maxLength={250}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="fieldset-label">Optional</div>
              </FormControl>
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
              <div className="card-actions justify-end flex md:flex-row flex-col items-center gap-2">
                <button type="submit" className="btn btn-primary w-full">
                  {isEditMode ? "Update Checklist" : "Create Checklist"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline w-full"
                  onClick={() => setLocation(CHECKLIST_LIST)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Page>
  );
};
