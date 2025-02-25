import {
  buildCreateSlice,
  asyncThunkCreator,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";

import {
  generateTelemetryData,
  updateTelemetryData,
  getRandomNumber,
  aggregateTelemetryData,
  validateTelemetryData,
} from "src/services/getTelemetryData";
import { TelemetryData } from "src/types/Telemetry";
import { updateNotifications } from "../Notifications/NotificationsSlice";
import { RootState } from "src/store";
import { addToast } from "../toasts/toastsSlice";
import {
  EV_LIST_ITEMS_COUNT,
  EV_LIST_MAX_INTERVAL,
  EV_LIST_MIN_ITEMS_TO_UPDATE,
} from "src/constants";

interface EvSliceI {
  isFetching: boolean;
  list: string[];
  itemsById: {
    [key: string]: TelemetryData;
  };
}

const getInitialState = () => {
  const arr: TelemetryData[] = new Array(EV_LIST_ITEMS_COUNT)
    .fill(0)
    .map(generateTelemetryData);
  return {
    list: arr.map(({ win }) => win),
    itemsById: arr.reduce((acc, item) => ({ ...acc, [item.win]: item }), {}),
  };
};

const initialState: EvSliceI = {
  isFetching: false,
  ...getInitialState(),
};

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

let updateTimeout: NodeJS.Timeout | null = null;

const evListSlice = createSliceWithThunks({
  name: "evList",
  initialState,
  reducers: (create) => ({
    updateItems: create.reducer(
      (state, action: PayloadAction<TelemetryData[]>) => {
        for (const item of action.payload) {
          state.itemsById[item.win] = item;
        }
      }
    ),
    updateItemsWithValidation: create.asyncThunk<void>(
      async (_, { dispatch, getState }) => {
        const state = getState() as RootState;
        if (!state.layout.isOnline) return;

        const itemsToUpdate = getRandomNumber(
          EV_LIST_MIN_ITEMS_TO_UPDATE,
          state.evList.list.length,
          0
        );
        const itemsIndexesToUpdate = new Set([
          ...new Array(itemsToUpdate)
            .fill(0)
            .map(() => getRandomNumber(0, state.evList.list.length - 1, 0)),
        ]);
        const itemIdsToUpdate = Array.from(itemsIndexesToUpdate).map(
          (index) => state.evList.list[index]
        );

        const updatedItems = [];
        for (const itemId of itemIdsToUpdate) {
          const newItem = updateTelemetryData(state.evList.itemsById[itemId]);
          updatedItems.push(newItem);
        }
        dispatch(evListSlice.actions.updateItems(updatedItems));
        const validationResults = [];
        for (const item of updatedItems) {
          validationResults.push(...validateTelemetryData(item));
        }
        dispatch(updateNotifications(validationResults));
        validationResults
          .filter(({ isCritical }) => isCritical)
          .forEach((result) => {
            dispatch(addToast({ message: result.message, isWarning: true }));
          });
      }
    ),
    startTelemetryUpdates: create.asyncThunk<void>(async (_, thunkApi) => {
      if (updateTimeout) return;

      const scheduleNextUpdate = () => {
        if (updateTimeout) {
          clearTimeout(updateTimeout);
        }

        const nextUpdateIn = getRandomNumber(1, EV_LIST_MAX_INTERVAL, 0) * 1000;
        updateTimeout = setTimeout(() => {
          thunkApi.dispatch(evListSlice.actions.updateItemsWithValidation()); // Use the async thunk
          scheduleNextUpdate();
        }, nextUpdateIn);
      };

      scheduleNextUpdate();
    }),
    stopTelemetryUpdates: create.asyncThunk<void>(async () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
        updateTimeout = null;
      }
    }),
  }),
  selectors: {
    selectItemsById: (state) => state.itemsById,
    selectAggregatedTelemetry: createSelector(
      [(state: EvSliceI) => state.itemsById],
      (itemsById) => {
        const items = Object.values(itemsById);
        return aggregateTelemetryData(items);
      }
    ),
    selectItemsAsArray: createSelector(
      [(state: EvSliceI) => state.itemsById],
      (itemsById) => {
        const items = Object.values(itemsById);
        return items;
      }
    ),
  },
});

export const { updateItems, startTelemetryUpdates, stopTelemetryUpdates } =
  evListSlice.actions;
export const { selectAggregatedTelemetry, selectItemsAsArray } =
  evListSlice.selectors;
export const evListReducer = evListSlice.reducer;
