import { Order } from '../domains';

import { $ } from '../utils/dom';

import type { MenuNameType, OrderInterface } from '../@types';

export class OrderList {
  private orderList: Order[];

  constructor() {
    this.orderList = [];
  }

  addOrder(order: OrderInterface) {
    const newRandomOrder = new Order({ ...order });
    this.orderList = [...this.orderList, newRandomOrder];
  }

  removeOrder(removeId: string | null) {
    this.orderList = this.orderList.filter(order => order.orderId !== removeId);
  }

  editOrder(editId: string) {
    const Order = this.orderList.find(order => order.orderId === editId);
    if (!Order) throw new Error(`${editId}의 id가진 order를 찾지못했습니다.`);

    const newOrder = $(`[data-id="${editId}"]`).children;
    const EDIT_CONTENT_COUNT = newOrder.length - 2;

    for (let i = 1; i < EDIT_CONTENT_COUNT; i++) Order.updateOrder(newOrder[i].textContent, i);
  }

  get orderListDatas(): OrderInterface[] {
    return this.orderList.map(order => order.orderDatas);
  }

  get orderTotalLength(): number {
    return this.orderList.length;
  }

  get currentOrderMenuNames(): MenuNameType[] {
    return this.orderList.map(order => order.orderMenuName);
  }
}
