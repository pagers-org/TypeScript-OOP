import { CoffeeOrderType } from '@/@types';

const getRandomNumber = (num: number): number => {
  return Math.trunc(Math.random() * num);
};

export const getRandomMenu = (arr: Array<string>) => {
  return arr[getRandomNumber(arr.length)];
};

export const getCoffeeNameOnly = (orders: Array<CoffeeOrderType>) => {
  const nameArrays: Array<string> = [];
  orders.map((order: CoffeeOrderType) => {
    const coffeeName = order.menu;
    nameArrays.push(coffeeName);
  });
  return [...new Set(nameArrays)];
};
