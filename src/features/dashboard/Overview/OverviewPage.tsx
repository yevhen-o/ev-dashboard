import { useEffect } from "react";
import { useActions } from "src/shared/hooks/useActions";

import { EVList } from "./EVList";
import { EVSummary } from "./EVSummary/EVSummary";

export function OverviewPage() {
  const { startTelemetryUpdates, stopTelemetryUpdates } = useActions();

  useEffect(() => {
    startTelemetryUpdates();
    return () => {
      stopTelemetryUpdates();
    };
  }, [startTelemetryUpdates, stopTelemetryUpdates]);
  return (
    <>
      <EVSummary />
      <EVList />
    </>
  );
}
