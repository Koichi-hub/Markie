import axios from 'axios';
import { UserDto } from '../models';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/users/',
  withCredentials: true,
});

export const getMe = async (): Promise<UserDto> => {
  const response = await instance.get('me');
  return response.data;
};
