import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { authApi } from '.';

dayjs.extend(utc);

export const getAxiosInstance = async () => {
  let accessToken = localStorage.getItem('access_token');

  if (!isValidAccessToken(accessToken)) {
    accessToken = await authApi.refreshTokens();
    localStorage.setItem('access_token', accessToken as string);
  }

  return axios.create({
    baseURL: 'http://localhost:8080/api/users/',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const isValidAccessToken = (accessToken: string | null): boolean => {
  try {
    if (!accessToken) return false;

    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    if (!payload['exp']) return false;

    return dayjs.utc().isBefore(dayjs.utc(parseInt(payload['exp']) * 1000));
  } catch (e) {
    return false;
  }
};
