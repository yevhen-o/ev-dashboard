import {
  buildCreateSlice,
  asyncThunkCreator,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { Notification } from "src/types/Notification";

interface NotificationsSliceI {
  lastSeen: string | null;
  notifications: Notification[];
}

const initialState: NotificationsSliceI = {
  lastSeen: null,
  notifications: [],
};

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const notificationsSlice = createSliceWithThunks({
  name: "notifications",
  initialState,
  reducers: (create) => ({
    updateNotifications: create.reducer(
      (state, action: PayloadAction<Omit<Notification, "from" | "to">[]>) => {
        for (const newNotification of action.payload) {
          let notification = state.notifications.find(
            (i) =>
              i.win === newNotification.win &&
              i.message === newNotification.message
          );
          if (notification) {
            notification.to = new Date().toISOString();
          } else {
            notification = {
              ...newNotification,
              from: new Date().toISOString(),
            };
            state.notifications.push(notification);
          }
        }
      }
    ),
    setLastSeen: create.reducer((state) => {
      state.lastSeen = new Date().toISOString();
    }),
  }),
  selectors: {
    //selectItemsById: (state) => state.itemsById,
    hasUnseenNotifications: createSelector(
      [
        (state: NotificationsSliceI) => state.notifications,
        (state: NotificationsSliceI) => state.lastSeen,
      ],
      (notifications, lastSeen) => {
        if (!notifications.length) return false;
        if (!lastSeen) {
          return true;
        }
        return notifications.some(
          (n) => (n.from && n.from > lastSeen) || (n.to && n.to > lastSeen)
        );
      }
    ),
    // selectItemsAsArray: createSelector(
    //   [(state: NotificationsSliceI) => state.itemsById], // Input selector
    //   (itemsById) => {
    //     const items = Object.values(itemsById);
    //     return items;
    //   }
    // ),
  },
});

export const { updateNotifications, setLastSeen } = notificationsSlice.actions;
export const { hasUnseenNotifications } = notificationsSlice.selectors;
export const notificationsReducer = notificationsSlice.reducer;
