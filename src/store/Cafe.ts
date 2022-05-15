import { Menu, Orders } from '@/domain';
import { addCustomEventListener } from '@/common';
import { EVENT } from '@/constant';

export class Cafe {
  public readonly menu: Menu;
  public readonly orders: Orders;

  constructor(orders: Orders, menu: Menu) {
    this.menu = menu;
    this.orders = orders;

    this.handleEvents();
  }

  handleEvents() {
    addCustomEventListener(EVENT.ORDER_ADDED, e => {
      this.orders.add(e.detail.order);
    });

    addCustomEventListener(EVENT.ORDER_REMOVED, e => {
      this.orders.remove(e.detail.order);
    });
  }
}
