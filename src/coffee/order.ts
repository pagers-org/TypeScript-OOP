import { nanoid } from 'nanoid';
import { getRandomMenu } from '@/helper/util';
import { COFFEE, SHOT, COLD_HOT, CUP, ICE, SIZE, CREAM, EXTRA, SYRUP } from '@/constant';

export const order = {
  _orders: [],
  _selectedCoffee: { id: '', name: '' },
  createOrder: function () {
    const singleOrder = {
      _id: nanoid(),
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
    this._orders.push(singleOrder);
    return singleOrder;
  },

  removeOrder: function (id: string) {
    const removed = this._orders.filter(order => order._id !== id);
    this._orders = removed;
    return;
  },

  getOrderByName: function (name: string) {
    const filtered = this._orders.filter(order => order.menu === name);
    return filtered;
  },

  selectCoffee: function (id: string, name: string) {
    this._selectedCoffee = { id, name };
  },
};
