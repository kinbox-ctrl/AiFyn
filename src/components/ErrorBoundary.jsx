import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-pearl px-6 text-center">
          <p className="font-mono text-xs tracking-widest text-aqua">SIGNAL LOST</p>
          <h1 className="font-display text-2xl font-bold text-deep">Something broke on our side.</h1>
          <button
            onClick={() => window.location.reload()}
            className="btn-warm mt-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;