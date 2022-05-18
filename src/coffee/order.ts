import { nanoid } from 'nanoid';
import { getRandomMenu } from '@/helper/util';
import { COFFEE, SHOT, COLD_HOT, CUP, ICE, SIZE, CREAM, EXTRA, SYRUP } from '@/constant';

//클래스가 아닌 다른 방법으로도 써보고싶어서 객체로 만들었어요!
export const order = {
  _orders: [], //비어 있어서 'never' 타입이라고 하는데 어떻게 타입을 주는건지 잘 모르겠어요ㅠ

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
    const filtered = this._orders.filter(order => order.menu !== name);
    return filtered;
  },
};
