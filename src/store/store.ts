import { configureStore } from "@reduxjs/toolkit";
import {
  layoutReducer,
  setOffline,
  setOnline,
} from "src/features/layout/layoutSlice";
import { evListReducer } from "src/features/dashboard/EvListSlice";
import { notificationsReducer } from "src/features/Notifications/NotificationsSlice";
import {
  addToast,
  removeToast,
  toastsReducer,
} from "src/features/toasts/toastsSlice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    evList: evListReducer,
    notifications: notificationsReducer,
    toasts: toastsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

window.addEventListener("online", () => {
  store.dispatch(setOnline());
  store.dispatch(
    removeToast({
      message: "You are offline",
    })
  );
});
window.addEventListener("offline", () => {
  store.dispatch(setOffline());
  store.dispatch(
    addToast({
      message: "You are offline",
      isPersistent: true,
      isWarning: true,
    })
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
