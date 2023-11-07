import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export * as localStorageUtils from './localStorageUtils';
export { SynchronizedAction } from './SynchronizedRequests';

dayjs.extend(utc);

// functions
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const isAccessTokenValid = (accessToken?: string | null): boolean => {
  try {
    if (!accessToken) accessToken = localStorage.getItem('access_token');

    if (!accessToken) return false;

    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    if (!payload['exp']) return false;

    return dayjs.utc().isBefore(dayjs.utc(parseInt(payload['exp']) * 1000));
  } catch (e) {
    return false;
  }
};
