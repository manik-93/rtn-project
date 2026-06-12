import { Component } from "react";
import ErrorMessage from "./ErrorMessage";

/** Catches unexpected render errors and shows a friendly fallback */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-app py-20">
          <ErrorMessage
            message={this.state.error?.message || "An unexpected error occurred."}
            onRetry={() => this.setState({ hasError: false, error: null })}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
