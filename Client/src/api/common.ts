import axios from 'axios';
import { appBaseURL, authApi } from '.';
import { SynchronizedAction } from '../utils/SynchronizedRequests';
import { isAccessTokenValid, localStorageUtils } from '../utils';

const refreshTokensSync = new SynchronizedAction(authApi.refreshTokens);

export const getAxiosInstance = async () => {
  let accessToken = localStorage.getItem('access_token');

  if (!isAccessTokenValid(accessToken)) {
    accessToken = await refreshTokensSync.actionSync();
    localStorageUtils.setItemWithConfirmation(
      'access_token',
      accessToken as string
    );
  }

  return axios.create({
    baseURL: `${appBaseURL}/api/users/`,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
