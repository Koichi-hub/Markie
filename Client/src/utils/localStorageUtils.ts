import { delay } from '.';

export const setItemWithConfirmation = async (key: string, value: string) => {
  let attempts = 0;
  while (attempts < 5 && localStorage.getItem(key) !== value) {
    localStorage.setItem(key, value);
    await delay(50);
    attempts++;
  }
};
