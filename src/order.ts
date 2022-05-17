import { CoffeeOptions } from 'Coffee';
import { COFFEE, CUP, EXTRA, ICE, ICEORHOT, SIZE, SYRUP, WHIPPEDCREAM, SHOT } from './utils/constants';
import { getRandomInt } from './utils/getRandom';

export default class Order {
  private orderList: CoffeeOptions[];

  constructor() {
    this.orderList = [];
  }

  private genRandomOne() {
    return {
      menu: COFFEE[getRandomInt(COFFEE)],
      size: SIZE[getRandomInt(SIZE)],
      shot: SHOT[getRandomInt(SHOT)],
      syrup: SYRUP[getRandomInt(SYRUP)],
      iceOrHot: ICEORHOT[getRandomInt(ICEORHOT)],
      ice: ICE[getRandomInt(ICE)],
      whippedCream: WHIPPEDCREAM[getRandomInt(WHIPPEDCREAM)],
      extra: EXTRA[getRandomInt(EXTRA)],
      cup: CUP[getRandomInt(CUP)],
    };
  }

  addRandomOrder(id: number) {
    const randomMenu = this.genRandomOne();
    this.orderList.push(Object.assign(randomMenu, { id: id.toString() }));
  }

  get OrderItem() {
    return this.orderList;
  }

  set setOrderItem(list: CoffeeOptions[]) {
    this.orderList = list;
  }

  set addOrderItem(value: CoffeeOptions) {
    this.orderList.push(value);
  }
}
