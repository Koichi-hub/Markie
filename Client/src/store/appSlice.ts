import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserDto } from '../models';
import { userApi } from '../api';

// state
export type AppState = {
  user?: UserDto | null;
};

const initialState: AppState = {};

// thunks
export const getMe = createAsyncThunk('appSlice/getMe', async () => {
  const user = await userApi.getMe();
  return user;
});

// reducers
export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserDto>) => {
      state.user = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

// actions
export const { setUser } = appSlice.actions;

export default appSlice.reducer;
