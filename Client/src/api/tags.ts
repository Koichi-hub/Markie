import axios from 'axios';
import { CreateTagDto, TagDto } from '../models';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/users/',
  withCredentials: true,
});

export const createTag = async (
  userGuid: string,
  createTagDto: CreateTagDto
): Promise<TagDto> => {
  const response = await instance.post(`${userGuid}/tags`, createTagDto);
  return response.data;
};

export const deleteTag = async (
  userGuid: string,
  tagGuid: string
): Promise<TagDto> => {
  const response = await instance.delete(`${userGuid}/tags/${tagGuid}`);
  return response.data;
};

export const deleteTags = async (
  userGuid: string,
  tagsGuids: string[]
): Promise<TagDto[]> => {
  const response = await instance.post(
    `${userGuid}/tags/delete-some`,
    tagsGuids
  );
  return response.data;
};

export const fetchTags = async (userGuid: string): Promise<TagDto[]> => {
  const response = await instance.get(`${userGuid}/tags`);
  return response.data;
};
