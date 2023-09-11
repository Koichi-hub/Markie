import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user';

// state
export type AppState = {
  user?: User | null;
};

const initialState: AppState = {
  user: {
    picture: null,
    username: 'Joe Biden',
  },
};

// reducers
export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
  },
});

// actions
export const { setUser } = appSlice.actions;

export default appSlice.reducer;
