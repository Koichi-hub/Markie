export * as authApi from './auth';
export * as tagsApi from './tags';
export * as userApi from './user';
export * as notesApi from './notes';
export { getAxiosInstance } from './common';

type AppBaseUrl = '' | 'http://localhost:8080';
export const appBaseURL: AppBaseUrl = 'http://localhost:8080';
