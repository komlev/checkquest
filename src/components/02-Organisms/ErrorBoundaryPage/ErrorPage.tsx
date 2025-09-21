import { FC } from "react";
import { Heading1, Subtitle } from "../../00-Atoms/Typography";
import { Page } from "../../01-Molecules/Page/Page";

type Props = {
  title?: string;
  description?: string;
  hideReload?: boolean;
};

export const ErrorPage: FC<Props> = ({
  title = "Error",
  description = "There was an error on a page",
  hideReload,
}) => {
  return (
    <Page className="flex flex-col items-center gap-2">
      <Heading1 className="mt-4">{title}</Heading1>
      <Subtitle>{description}</Subtitle>
      {!hideReload && (
        <div className="card-actions mt-4 justify-end">
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      )}
    </Page>
  );
};
