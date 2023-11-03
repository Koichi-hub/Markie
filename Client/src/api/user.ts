import { getAxiosInstance } from '.';
import { UserDto } from '../models';

export const getMe = async (): Promise<UserDto> => {
  const instance = await getAxiosInstance();
  const response = await instance.get('me');
  return response.data;
};
