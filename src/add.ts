import { COFFEE, SIZE, WHIPPEDCREAM, EXTRA, ICE, CUP, SYRUP, ICEORHOT, SHOT } from './constants';
import { getRandomItem } from './util';

export const generateRandomOrder = () => {
  const generateOrder = [COFFEE, SIZE, SHOT, SYRUP, ICEORHOT, ICE, WHIPPEDCREAM, EXTRA, CUP].map(item =>
    getRandomItem(item),
  );

  return generateOrder;
};
