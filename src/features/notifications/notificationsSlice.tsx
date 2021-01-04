import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { RootState } from '../../store';

export type NotificationType = {
  id: string;
  date: string;
  message: string;
  user: string;
  read: boolean;
  isNew: boolean;
};

export const selectNotifications = (state: RootState) =>
  state.notifications.notifications;

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const notifications = selectNotifications(getState() as RootState);
    const [lastNotification] = notifications;
    const lastDate = lastNotification?.date || '';
    const response = await client.get(
      `/fakeApi/notifications?since=${lastDate}`
    );
    return response.notifications;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [] as NotificationType[],
  },
  reducers: {
    readAll(state) {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action: PayloadAction<NotificationType[]>) => {
        state.notifications.forEach(
          (notification) => (notification.isNew = !notification.read)
        );
        state.notifications.push(...action.payload);
        state.notifications.sort((a, b) => b.date.localeCompare(a.date));
      }
    );
  },
});

export const { readAll } = notificationsSlice.actions;

export default notificationsSlice.reducer;
