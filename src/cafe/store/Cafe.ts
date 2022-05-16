import { Menu, Orders } from '@/domain';

export class Cafe {
  public readonly menu: Menu;
  public readonly orders: Orders;

  constructor(orders: Orders, menu: Menu) {
    this.menu = menu;
    this.orders = orders;
  }
}
