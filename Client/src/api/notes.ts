import { getAxiosInstance } from '.';
import { ChangeNoteDto, CreateNoteDto, NoteDto } from '../models';

export const createNote = async (
  userGuid: string,
  createNoteDto: CreateNoteDto
): Promise<NoteDto> => {
  const instance = await getAxiosInstance();
  const response = await instance.post(`${userGuid}/notes`, createNoteDto);
  return response.data;
};

export const fetchNotes = async (userGuid: string): Promise<NoteDto[]> => {
  const instance = await getAxiosInstance();
  const response = await instance.get(`${userGuid}/notes`);
  return response.data;
};

export const fetchNotesByTag = async (
  userGuid: string,
  tagGuid: string
): Promise<NoteDto[]> => {
  const instance = await getAxiosInstance();
  const response = await instance.get(`${userGuid}/tags/${tagGuid}/notes`);
  return response.data;
};

export const fetchNotesCount = async (userGuid: string): Promise<number> => {
  const instance = await getAxiosInstance();
  const response = await instance.get(`${userGuid}/notes/count`);
  return response.data;
};

export const changeNote = async (
  userGuid: string,
  noteGuid: string,
  changeNoteDto: ChangeNoteDto
): Promise<NoteDto> => {
  const instance = await getAxiosInstance();
  const response = await instance.put(
    `${userGuid}/notes/${noteGuid}`,
    changeNoteDto
  );
  return response.data;
};

export const deleteNote = async (
  userGuid: string,
  noteGuid: string
): Promise<NoteDto> => {
  const instance = await getAxiosInstance();
  const response = await instance.delete(`${userGuid}/notes/${noteGuid}`);
  return response.data;
};
