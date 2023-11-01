import { AnyAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import notesSlice, {
  changeNoteListenerMiddleware,
  createNoteListenerMiddleware,
  setTagListenerMiddleware,
} from '../pages/notes/notesSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

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
    })
      .prepend(setTagListenerMiddleware.middleware)
      .prepend(createNoteListenerMiddleware.middleware)
      .prepend(changeNoteListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
