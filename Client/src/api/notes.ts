import axios from 'axios';
import { CreateNoteDto, NoteDto } from '../models';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/users/',
  withCredentials: true,
});

export const createNote = async (
  userGuid: string,
  createNoteDto: CreateNoteDto
): Promise<NoteDto> => {
  const response = await instance.post(`${userGuid}/notes`, createNoteDto);
  return response.data;
};

export const fetchNotesByTag = async (
  userGuid: string,
  tagGuid: string
): Promise<NoteDto[]> => {
  const response = await instance.get(`${userGuid}/tags/${tagGuid}/notes`);
  return response.data;
};
