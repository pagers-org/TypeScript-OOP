import { nanoid } from 'nanoid';

export const getRandomValue = (_array: string[]) => {
  return _array[~~(Math.random() * _array.length)];
};

export const getRandomID = () => {
  return nanoid();
};
