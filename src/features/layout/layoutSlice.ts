import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  storageGet,
  storageGetKey,
  storageSet,
} from "src/services/localStorage";
import { TelemetryData } from "src/types";

const hiddenFieldsKey = storageGetKey("plateHiddenFields");

interface LayoutSliceI {
  theme: "dark" | "light";
  isOnline: boolean;
  hiddenFields: (keyof TelemetryData)[];
}

const storedTheme = localStorage.getItem("theme");
const initialState: LayoutSliceI = {
  theme:
    storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window?.matchMedia?.("(prefers-color-scheme: light)")?.matches
      ? "light"
      : "dark",
  isOnline: navigator.onLine,
  hiddenFields: storageGet(hiddenFieldsKey, []),
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleTheme(state) {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      state.theme = nextTheme;
      localStorage.setItem("theme", nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      return state;
    },
    setOnline(state) {
      state.isOnline = true;
    },
    setOffline(state) {
      state.isOnline = false;
    },
    setFieldHidden(state, action: PayloadAction<keyof TelemetryData>) {
      state.hiddenFields = [...state.hiddenFields, action.payload];
      storageSet(hiddenFieldsKey, state.hiddenFields);
    },
    removeFieldHidden(state, action: PayloadAction<keyof TelemetryData>) {
      state.hiddenFields = state.hiddenFields.filter(
        (f) => f !== action.payload
      );
      storageSet(hiddenFieldsKey, state.hiddenFields);
    },
  },
});

export const {
  toggleTheme,
  setOnline,
  setOffline,
  setFieldHidden,
  removeFieldHidden,
} = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
