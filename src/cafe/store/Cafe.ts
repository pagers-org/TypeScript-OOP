import { AbstractApi, Menu, MenuItem, Order, Orders, Serving, Servings } from '@/domain';
import { nanoid } from 'nanoid';
import { getRandomRange } from '@/common';

export class Cafe {
  private readonly api: AbstractApi;
  private readonly orders: Orders;
  private readonly servings: Servings;

  private menu!: Menu;

  constructor(api: AbstractApi, orders: Orders, servings: Servings) {
    this.api = api;
    this.orders = orders;
    this.servings = servings;

    this.createMenu();
  }

  private async createMenu() {
    const beverages = await this.api.getBeveragesAll();
    const menuItems = beverages.map(item => new MenuItem({ beverageId: item.getId() }));
    this.menu = new Menu({ menuItems });
  }

  public menuItems(): MenuItem[] {
    return this.menu.getMenuItems();
  }

  public firstOrder(): Order {
    return this.orders.firstOrder();
  }

  public isEmptyOrder(): boolean {
    return this.orders.isEmpty();
  }

  public isEmptyOrderGroup(beverageId: number): boolean {
    return this.orders.isEmptyOrderGroup(beverageId);
  }

  public addOrder(order: Order): void {
    this.orders.addOrder(order);
  }

  public removeOrder(order: Order): void {
    this.orders.removeOrder(order);
  }

  public addServing(serving: Serving) {
    this.servings.add(serving);
  }

  public findBeverage(beverageId: number) {
    return this.api.findBeverage(beverageId);
  }

  public findBeverageName(beverageId: number) {
    return this.api.findBeverageName(beverageId);
  }

  public async createRandomOrder(menuId: number) {
    const optionGroups = await this.createRandomSelectedOptionGroups();

    return new Order({
      id: nanoid(),
      beverageId: menuId,
      optionGroups,
    });
  }

  public async createRandomBeverageOrder() {
    const beveragesCount = await this.api.getBeveragesCount();

    return this.createRandomOrder(getRandomRange(1, beveragesCount));
  }

  private async createRandomSelectedOptionGroups() {
    const optionGroups = await this.api.getOptionGroupsAll();

    return optionGroups.map(item => {
      const newGroup = item.clone();
      newGroup.resetSelected();
      newGroup.randomSelected();
      return newGroup;
    });
  }
}
