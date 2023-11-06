export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export * as localStorageUtils from './localStorageUtils';
