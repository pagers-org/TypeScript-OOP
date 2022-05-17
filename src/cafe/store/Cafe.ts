import { Menu, Order, Orders, Serving, Servings } from '@/domain';

export class Cafe {
  private readonly menu: Menu;
  private readonly orders: Orders;
  private readonly servings: Servings;
  private openModal = false;

  constructor(orders: Orders, menu: Menu, servings: Servings) {
    this.menu = menu;
    this.orders = orders;
    this.servings = servings;
  }

  public menuItemElements(): HTMLElement[] {
    return this.menu.toMenuItemElements();
  }

  public firstOrder(): Order {
    return this.orders.firstOrder();
  }

  public firstOrderShift() {
    return this.orders.firstOrderShift();
  }

  public isEmptyOrder(): boolean {
    return this.orders.isEmpty();
  }

  public isEmptyOrderGroup(beverageId: number): boolean {
    return this.orders.isEmptyOrderGroup(beverageId);
  }

  public addOrderGroup(order: Order): void {
    this.orders.addOrderGroup(order);
  }

  public removeOrderGroup(order: Order): void {
    this.orders.removeOrderGroup(order);
  }

  public addServing(serving: Serving) {
    this.servings.add(serving);
  }

  public setOpenModal(opened: boolean): void {
    this.openModal = opened;
  }

  public isOpenModal(): boolean {
    return this.openModal;
  }
}
