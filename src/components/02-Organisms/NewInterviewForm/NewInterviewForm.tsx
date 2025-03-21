import clsx from "clsx";
import { FC } from "react";
import { Checklist, Interview } from "../../../types";
import { FormControl } from "../../00-Atoms/FormControl/FormControl";
import { useInterviewForm } from "./useInterviewForm";

type Props = {
  checklistParam?: string | null;
  onCreate: (interview: Interview) => void;
  onClose: () => void;
  onChecklist?: (checklist?: Checklist) => void;
  isPage?: boolean;
};

export const NewInterviewForm: FC<Props> = ({
  checklistParam,
  isPage,
  onClose,
  onCreate,
  onChecklist,
}) => {
  const { handleSubmit, errors, value, $state, checklists } = useInterviewForm(
    onCreate,
    onChecklist,
    checklistParam
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div
          className={clsx("grid grid-cols-1 gap-2", {
            ["sm:grid-cols-2"]: isPage,
          })}
        >
          <FormControl id="name" label="Interview Name" error={errors.name}>
            <input
              id="name"
              type="text"
              required
              aria-required="true"
              className={clsx("input w-full", errors.name && "input-error")}
              placeholder="Name"
              value={value.name}
              onChange={(e) => {
                $state.setKey("tocuhed.name", true);
                $state.setKey("value.name", e.target.value);
              }}
            />
          </FormControl>
          <FormControl
            id="checklist"
            label="Checklist"
            error={errors.checklist}
          >
            <select
              id="checklist"
              required
              aria-required="true"
              className={clsx(
                "select select-bordered w-full",
                errors.checklist && "select-error"
              )}
              value={value.checklist}
              onChange={(e) => {
                $state.setKey("tocuhed.checklist", true);
                $state.setKey("value.checklist", e.target.value);
              }}
            >
              <option value="">Select a checklist</option>
              {checklists.map((checklist) => (
                <option key={checklist.id} value={checklist.id}>
                  {checklist.name}
                </option>
              ))}
            </select>
          </FormControl>
        </div>
        <div className="card-actions justify-end flex sm:flex-row flex-col-reverse">
          <button
            id="cancel-new-interview-btn"
            type="button"
            onClick={onClose}
            className="btn btn-outline w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            id="submit-new-interview-btn"
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
          >
            Start Interview
          </button>
        </div>
      </div>
    </form>
  );
};
