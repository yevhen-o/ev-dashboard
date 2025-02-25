import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MAX_TOASTS_TO_DISPLAY } from "src/constants";
import { ToastMessage, ToastType } from "src/types";

interface toastsSliceI {
  toasts: ToastType[];
}

const initialState: toastsSliceI = {
  toasts: [],
};

const getToastId = (message: ToastMessage) =>
  typeof message === "string"
    ? message
    : message.title + " " + message.description;

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<ToastType, "id">>) => {
      const id = getToastId(action.payload.message);
      state.toasts = [
        ...state.toasts.filter((t) => t.id !== id),
        { id, ...action.payload },
      ];
    },
    removeToast: (state, action: PayloadAction<Omit<ToastType, "id">>) => {
      const id = getToastId(action.payload.message);
      state.toasts = [...state.toasts.filter((t) => t.id !== id)];
    },
  },
  selectors: {
    toastsToDisplaySelector: createSelector(
      [(state: toastsSliceI) => state.toasts],
      (items) => {
        return items.slice(0, MAX_TOASTS_TO_DISPLAY);
      }
    ),
  },
});

export const { addToast, removeToast } = toastsSlice.actions;
export const { toastsToDisplaySelector } = toastsSlice.selectors;
export const toastsReducer = toastsSlice.reducer;
