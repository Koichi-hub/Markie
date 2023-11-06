import axios from 'axios';
import { UserAuthorizedDto } from '../models';

export const getGoogleAuthUri = async (): Promise<string> => {
  const response = await axios.get('http://localhost:8080/api/auth/uri/google');
  return response.data;
};

export const getGoogleAuthorizedUser = async (
  code: string
): Promise<UserAuthorizedDto> => {
  const response = await axios.get('http://localhost:8080/api/auth/google', {
    params: { code },
  });
  return response.data;
};

export const getVKAuthUri = async (): Promise<string> => {
  const response = await axios.get('http://localhost:8080/api/auth/uri/vk');
  return response.data;
};

export const getVKAuthorizedUser = async (
  code: string
): Promise<UserAuthorizedDto> => {
  const response = await axios.get('http://localhost:8080/api/auth/vk', {
    params: { code },
  });
  return response.data;
};

export const refreshTokens = async (): Promise<string> => {
  const response = await axios.get('http://localhost:8080/api/auth/refresh');
  return response.data;
};
