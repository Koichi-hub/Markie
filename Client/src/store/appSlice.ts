import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserDto } from '../models';

// state
export type AppState = {
  user?: UserDto | null;
};

const initialState: AppState = {};

// reducers
export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserDto>) => {
      state.user = payload;
    },
  },
});

// actions
export const { setUser } = appSlice.actions;

export default appSlice.reducer;
