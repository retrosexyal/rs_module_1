import React from "react";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error</div>;
    }
    return this.props.children;
  }
}
function logErrorToMyService(
  error: Error,
  componentStack: string | null | undefined,
) {
  console.log(error, componentStack);
}
