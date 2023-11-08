import axios from 'axios';
import { UserAuthorizedDto } from '../models';
import { appBaseURL } from '.';

export const getGoogleAuthUri = async (): Promise<string> => {
  const response = await axios.get(`${appBaseURL}/api/auth/uri/google`);
  return response.data;
};

export const getGoogleAuthorizedUser = async (
  code: string
): Promise<UserAuthorizedDto> => {
  const response = await axios.get(`${appBaseURL}/api/auth/google`, {
    params: { code },
  });
  return response.data;
};

export const getVKAuthUri = async (): Promise<string> => {
  const response = await axios.get(`${appBaseURL}/api/auth/uri/vk`);
  return response.data;
};

export const getVKAuthorizedUser = async (
  code: string
): Promise<UserAuthorizedDto> => {
  const response = await axios.get(`${appBaseURL}/api/auth/vk`, {
    params: { code },
  });
  return response.data;
};

export const refreshTokens = async (): Promise<string> => {
  const response = await axios.get(`${appBaseURL}/api/auth/refresh`);
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('access_token');
  await axios.get(`${appBaseURL}/api/auth/logout`);
};
