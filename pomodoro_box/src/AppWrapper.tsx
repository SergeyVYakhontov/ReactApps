import React, { useState, useEffect } from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import { hot } from "react-hot-loader/root";
import { App } from "./App";
import { rootStore } from "@/store/rootStore";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorModal } from "@/components/ErrorModal/ErrorModal";

export function AppWrapperComponent() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  },
    []);

  if (!isMounted) {
    return <></>;
  }

  return (
    <SSRProvider>
      <Provider store={rootStore}>
        <ErrorBoundary FallbackComponent={ErrorModal}>
          <App />
        </ErrorBoundary>
      </Provider>
    </SSRProvider>
  );
}

export const AppWrapper = hot(() => <AppWrapperComponent />);