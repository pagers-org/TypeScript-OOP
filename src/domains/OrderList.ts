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

  // TODO: 로직 고칠 수 있지 않을까?..
  editOrder(editId: string) {
    const Order = this.orderList.find(order => order.orderId === editId);
    const newOrder = $(`[data-id="${editId}"]`).children;

    Array.from(newOrder).forEach(($el, index) => {
      if ($el.getAttribute('data-title') === '수정하기' || $el.getAttribute('data-title') === '삭제하기') return;
      Order?.updateOrder($el.textContent, index);
    });
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
