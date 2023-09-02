import { configureStore } from '@reduxjs/toolkit';

// store состоит из reducer'ов
// у reducer'ов есть state, который они изменяют через action'ы
// >^•-•^<
export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
