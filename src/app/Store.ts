import { Menu, Orders } from '@/domain';

export class Store {
  public readonly orders: Orders;
  public readonly menu: Menu;

  constructor(orders: Orders, menu: Menu) {
    this.orders = orders;
    this.menu = menu;
  }
}
