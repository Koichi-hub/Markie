import { getAxiosInstance } from '.';
import { CreateTagDto, TagDto } from '../models';

export const createTag = async (
  userGuid: string,
  createTagDto: CreateTagDto
): Promise<TagDto> => {
  const instance = await getAxiosInstance();
  const response = await instance?.post(`${userGuid}/tags`, createTagDto);
  return response?.data;
};

export const deleteTag = async (
  userGuid: string,
  tagGuid: string
): Promise<TagDto> => {
  const instance = await getAxiosInstance();
  const response = await instance?.delete(`${userGuid}/tags/${tagGuid}`);
  return response?.data;
};

export const deleteTags = async (
  userGuid: string,
  tagsGuids: string[]
): Promise<TagDto[]> => {
  const instance = await getAxiosInstance();
  const response = await instance?.post(
    `${userGuid}/tags/delete-some`,
    tagsGuids
  );
  return response?.data;
};

export const fetchTags = async (userGuid: string): Promise<TagDto[]> => {
  const instance = await getAxiosInstance();
  const response = await instance?.get(`${userGuid}/tags`);
  return response?.data;
};
