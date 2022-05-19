import { AbstractApi, Beverage, Menu, MenuItem, Order, Orders, Serving, Servings } from '@/domain';
import { nanoid } from 'nanoid';
import { getRandomRange } from '@/common';
import { EventDispatcher } from '@/cafe/event/EventDispatcher';
import { EventListener } from '@/cafe/event/EventListener';

export type CafeOrder = {
  order: Order;
  beverage: Beverage;
};

export class Cafe {
  private readonly api: AbstractApi;

  private readonly orders: Orders;
  private readonly servings: Servings;

  private readonly eventDispatcher = new EventDispatcher();
  private readonly eventListener = new EventListener();

  constructor(api: AbstractApi, orders: Orders, servings: Servings) {
    this.api = api;
    this.orders = orders;
    this.servings = servings;
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

  public async findBeverage(beverageId: number) {
    return await this.api.findBeverage(beverageId);
  }

  public async getMenu() {
    const beverages = await this.api.getBeveragesAll();
    const menuItems = beverages.map(item => new MenuItem({ beverageId: item.getId() }));
    return new Menu({ menuItems });
  }

  public async getMenuItems() {
    return (await this.getMenu()).getMenuItems();
  }

  public async firstOrder(): Promise<CafeOrder> {
    const order = this.orders.firstOrder();
    const beverage = await this.findBeverage(order.getBeverageId());

    return { order, beverage };
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

  public getEventDispatcher() {
    return this.eventDispatcher;
  }

  public getEventListener() {
    return this.eventListener;
  }
}
