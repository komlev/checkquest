import { FC } from "react";
import { CHECKLIST_LIST } from "../../../routes";
import { FormControl } from "../../00-Atoms/FormControl/FormControl";
import { Line } from "../../00-Atoms/Line/Line";
import { Toolstrip } from "../../00-Atoms/Tooltstrip/Toolstip";
import { Heading1 } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";
import { ChecklistScore } from "./ChecklistScore";
import { SectionInput } from "./SectionInput";
import { useChecklistFormPage } from "./useChecklistFormPage";

export const NewChecklistPage: FC = () => {
  const {
    description,
    errors,
    isEditMode,
    lastInput,
    selectedSection,
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

  const sectionsLength = sections.length;
  const onCancelClick = () => {
    setLocation(CHECKLIST_LIST);
  };

  return (
    <Page>
      <Toolstrip>
        <Heading1>{isEditMode ? "Edit Checklist" : "New Checklist"}</Heading1>
      </Toolstrip>
      <Line />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {sectionsLength === 0 ? (
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
                      key={section.id}
                      addQuestion={addQuestion}
                      removeQuestion={removeQuestion}
                      updateQuestion={updateQuestion}
                      section={section}
                      removeSection={removeSection}
                      updateSection={updateSection}
                      sectionIndex={sectionIndex}
                      sectionsLength={sectionsLength}
                      lastInput={lastInput}
                      selectedSection={selectedSection}
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
              <FormControl
                id="name"
                label="Checklist name"
                error={errors.name}
                required
              >
                <input
                  id="name"
                  type="text"
                  className="input w-full"
                  placeholder="Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="description" label="Checklist description">
                <textarea
                  id="description"
                  className="textarea h-24 w-full"
                  placeholder="Description"
                  value={description}
                  maxLength={250}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="fieldset-label">Optional</div>
              </FormControl>
              <ChecklistScore sections={sections} />
              <div className="card-actions justify-end flex md:flex-row flex-col items-center gap-2">
                <button
                  id="submit-btn"
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  {isEditMode ? "Update Checklist" : "Create Checklist"}
                </button>
                <button
                  id="cancel-btn"
                  type="button"
                  className="btn btn-outline w-full"
                  onClick={onCancelClick}
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
