import { Menu, Orders } from '@/domain';

export class Cafe {
  private readonly menu: Menu;
  private readonly orders: Orders;

  constructor(orders: Orders, menu: Menu) {
    this.menu = menu;
    this.orders = orders;
  }

  public getMenu() {
    return this.menu;
  }

  public getOrders() {
    return this.orders;
  }
}
