import { Component, ErrorInfo, ReactNode } from "react";
import { Page } from "../../01-Molecules/Page/Page";
import { Heading1, Subtitle } from "../../00-Atoms/Typography";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundaryPage extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Page className="flex flex-col items-center gap-2">
            <Heading1 className="mt-4">Page Error</Heading1>
            <Subtitle>There was an error on a page</Subtitle>
            <div className="card-actions mt-4 justify-end">
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>
            </div>
          </Page>
        )
      );
    }

    return this.props.children;
  }
}
