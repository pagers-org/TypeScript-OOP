import { getRandomNumber } from './common';

export const getRandomItem = (inventory: string[]) => {
  return inventory[getRandomNumber(inventory.length)];
};
