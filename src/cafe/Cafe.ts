import { Order, Orders, Serving, Servings } from '@/domain';

export class Cafe {
  private readonly orders: Orders;
  private readonly servings: Servings;

  constructor(orders: Orders, servings: Servings) {
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

  public firstOrder(): Order {
    return this.orders.firstOrder();
  }

  public addServing(serving: Serving) {
    this.servings.add(serving);
  }
}
