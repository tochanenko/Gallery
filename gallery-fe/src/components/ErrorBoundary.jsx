import React from "react";
import ErrorComponent from "./ErrorComponent/ErrorComponent";
import store from "../store";

// This component is not currently in use

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError || store.getState().error.isError) {
      return <div className="container"><ErrorComponent /></div>;
    }

    return this.props.children;
  }
}