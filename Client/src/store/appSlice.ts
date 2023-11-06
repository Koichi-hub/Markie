import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserDto } from '../models';
import { authApi, userApi } from '../api';
import { localStorageUtils } from '../utils';

// state
export type AppState = {
  user?: UserDto | null;
  isUserLoading?: boolean;
};

const initialState: AppState = {
  isUserLoading: false,
};

// thunks
export const getMe = createAsyncThunk(
  'appSlice/getMe',
  async (_action, thunkApi) => {
    thunkApi.dispatch(setIsUserLoading(true));
    const user = await userApi.getMe();
    return user;
  }
);

export const authViaGoogle = createAsyncThunk<UserDto, string>(
  'appSlice/authViaGoogle',
  async (code: string, thunkApi) => {
    thunkApi.dispatch(setIsUserLoading(true));
    const userAuthorized = await authApi.getGoogleAuthorizedUser(code);
    await localStorageUtils.setItemWithConfirmation(
      'access_token',
      userAuthorized.accessToken
    );
    return userAuthorized.user;
  }
);

export const authViaVK = createAsyncThunk<UserDto, string>(
  'appSlice/authViaVK',
  async (code: string, thunkApi) => {
    thunkApi.dispatch(setIsUserLoading(true));
    const userAuthorized = await authApi.getVKAuthorizedUser(code);
    await localStorageUtils.setItemWithConfirmation(
      'access_token',
      userAuthorized.accessToken
    );
    return userAuthorized.user;
  }
);

// reducers
export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserDto>) => {
      state.user = payload;
      state.isUserLoading = false;
    },
    setIsUserLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserLoading = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUserLoading = false;
    });
    builder.addCase(getMe.rejected, state => {
      state.user = null;
      state.isUserLoading = false;
    });
    builder.addCase(authViaGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUserLoading = false;
    });
    builder.addCase(authViaGoogle.rejected, state => {
      state.user = null;
      state.isUserLoading = false;
    });
    builder.addCase(authViaVK.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUserLoading = false;
    });
    builder.addCase(authViaVK.rejected, state => {
      state.user = null;
      state.isUserLoading = false;
    });
  },
});

// actions
export const { setUser, setIsUserLoading } = appSlice.actions;

export default appSlice.reducer;
