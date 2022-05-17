import { AbstractApi, Menu, MenuItem, Order, Orders, Serving, Servings } from '@/domain';

export class Cafe {
  private readonly orders: Orders;
  private readonly servings: Servings;
  private readonly api: AbstractApi;
  private openModal = false;

  private menu: Menu;

  constructor(api: AbstractApi, orders: Orders, servings: Servings) {
    this.api = api;
    this.orders = orders;
    this.servings = servings;

    this.menu = api.createMenu();
  }

  public menuItems(): MenuItem[] {
    return this.menu.getMenuItems();
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

  public createRandomOrder(menuId: number) {
    return this.api.createRandomOrder(menuId);
  }

  public createRandomBeverageOrder() {
    return this.api.createRandomBeverageOrder();
  }

  public getBeverage(beverageId: number) {
    return this.api.findBeverage(beverageId);
  }

  public getBeverageName(beverageId: number) {
    return this.api.findBeverageName(beverageId);
  }
}
