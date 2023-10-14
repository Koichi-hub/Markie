import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import notesSlice from '../pages/notes/notesSlice';

// store состоит из reducer'ов
// у reducer'ов есть state, который они изменяют через action'ы
// >^•-•^<
export const store = configureStore({
  reducer: {
    app: appReducer,
    notes: notesSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
