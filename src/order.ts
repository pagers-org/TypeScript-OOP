import { CoffeeOptions } from 'Coffee';

export default class Order {
  private orderList: CoffeeOptions[];

  constructor() {
    this.orderList = [];
  }

  addMenu(randomMenu: Omit<CoffeeOptions, 'id'>, orderId: number) {
    this.orderList.push(Object.assign(randomMenu, { id: orderId.toString() }));
  }

  isEmpty() {
    return this.orderList.length === 0;
  }

  remove(currentElement: HTMLDivElement) {
    const filtered = this.orderList.filter(item => item.id !== currentElement.id);
    this.setOrderItem = filtered;
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
