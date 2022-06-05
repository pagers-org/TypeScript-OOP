import { v4 } from 'uuid';

export const pickRandomInArray = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const pickRandomUniqueId = () => {
  return v4();
};
