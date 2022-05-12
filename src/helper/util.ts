import { OrderItemType } from '../@types';
import { COFFEE, SHOT, COLD_HOT, CUP, ICE } from '../constant/index';

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
    shot: getRandomMenu(SHOT),
    ice_hot: getRandomMenu(COLD_HOT),
    cup: getRandomMenu(CUP),
    ice_type: getRandomMenu(ICE),
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
