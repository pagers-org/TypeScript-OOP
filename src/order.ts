import { MenuInterface } from 'Menu';
import { COFFEE, CUP, EXTRA, ICE, ICEORHOT, SIZE, SYRUP, WHIPPEDCREAM } from './utils/constants';
import { getRandomInt } from './utils/getRandom';

class Order {
  private orderList: MenuInterface[];

  constructor() {
    this.orderList = [];
  }

  get getRandomOrder() {
    return {
      menu: COFFEE[getRandomInt(0, 10)],
      size: SIZE[getRandomInt(0, 3)],
      shot: `${getRandomInt(1, 4)}샷`,
      syrup: SYRUP[getRandomInt(0, 3)],
      iceOrHot: ICEORHOT[getRandomInt(0, 2)],
      ice: ICE[getRandomInt(0, 2)],
      whippedCream: WHIPPEDCREAM[getRandomInt(0, 3)],
      extra: EXTRA[getRandomInt(0, 5)],
      cup: CUP[getRandomInt(0, 2)],
    };
  }

  get getOrderItem() {
    return this.orderList;
  }

  set setOrderItem(list: MenuInterface[]) {
    this.orderList = list;
  }

  set addOrderItem(value: MenuInterface) {
    this.orderList.push(value);
  }
}

export default Order;
