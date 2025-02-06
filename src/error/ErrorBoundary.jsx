import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {}
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", padding: "20px", border: "1px solid red" }}>
          <h2>Something went wrong!</h2>
          {/* <p>{this.state.error.message}</p> */}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
