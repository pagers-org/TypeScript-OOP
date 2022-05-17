import { OrderItemType } from '../@types';
import { COFFEE, SHOT, COLD_HOT, CUP, ICE, SIZE, CREAM, EXTRA, SYRUP } from '../constant/index';

const getRandomNumber = (num: number): number => {
  return Math.trunc(Math.random() * num);
};

const getRandomMenu = (arr: Array<string>) => {
  return arr[getRandomNumber(arr.length)];
};
export const getRandomCoffee = () => {
  return {
    _id: getRandomId(),
    menu: getRandomMenu(COFFEE),
    size: getRandomMenu(SIZE),
    cup: getRandomMenu(CUP),
    iceOrHot: getRandomMenu(COLD_HOT),
    shot: getRandomMenu(SHOT),
    ice: getRandomMenu(ICE),
    cream: getRandomMenu(CREAM),
    extra: getRandomMenu(EXTRA),
    syrup: getRandomMenu(SYRUP),
  };
};

export const getRandomId = () => {
  return Math.random().toString(36).substring(2, 16);
};

export const getCoffeeNameOnly = (orders: Array<OrderItemType>) => {
  const nameArrays: Array<string> = [];
  orders.map((order: OrderItemType) => {
    const coffeeName = order.menu;
    nameArrays.push(coffeeName);
  });
  return [...new Set(nameArrays)];
};
