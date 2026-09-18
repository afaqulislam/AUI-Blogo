"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class StudioErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Studio client error:", error);
    try {
      const last = Number(sessionStorage.getItem("studio-last-reload") || 0);
      if (Date.now() - last > 5000) {
        sessionStorage.setItem("studio-last-reload", String(Date.now()));
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-6 text-sm text-indigo-950 dark:text-white">Reloading Studio&hellip;</div>;
    }
    return this.props.children;
  }
}