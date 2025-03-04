import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  evListReducer,
  updateItems,
  startTelemetryUpdates,
  stopTelemetryUpdates,
  selectAggregatedTelemetry,
} from "./EvListSlice";
import { TelemetryData } from "src/types/Telemetry";
import { generateTelemetryData } from "src/services/getTelemetryData";

describe("evListSlice", () => {
  let store: ReturnType<
    typeof configureStore<{ evList: ReturnType<typeof evListReducer> }>
  >;

  beforeEach(() => {
    store = configureStore({ reducer: { evList: evListReducer } });
    vi.useFakeTimers();
    vi.spyOn(global, "setTimeout");
    vi.spyOn(global, "clearTimeout");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("should initialize state with 10 items", () => {
    const state = store.getState().evList as ReturnType<typeof evListReducer>;
    expect(state.list.length).toBe(30);
    expect(Object.keys(state.itemsById).length).toBe(30);
  });

  it("should update telemetry items", () => {
    const newItem: TelemetryData = generateTelemetryData();
    store.dispatch(updateItems([newItem]));

    const state = store.getState().evList;
    expect(state.itemsById[newItem.win]).toEqual(newItem);
  });

  it("should start and stop telemetry updates", () => {
    store.dispatch(startTelemetryUpdates());

    expect(setTimeout).toHaveBeenCalled();

    store.dispatch(stopTelemetryUpdates());
    expect(clearTimeout).toHaveBeenCalled();
  });

  it("should select aggregated telemetry data", () => {
    const state = store.getState();
    const aggregated = selectAggregatedTelemetry(state);
    expect(aggregated).toBeDefined();
  });
});
