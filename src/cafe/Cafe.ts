import { Order, Serving, Servings } from '@/domain';
import { OrderGroups } from '@/domain/order/group/OrderGroups';

export class Cafe {
  private readonly orderGroups: OrderGroups;
  private readonly servings: Servings;

  constructor(orderGroups: OrderGroups, servings: Servings) {
    this.orderGroups = orderGroups;
    this.servings = servings;
  }

  public isEmptyOrder(): boolean {
    return this.orderGroups.isEmpty();
  }

  public isEmptyOrderGroup(beverageId: number): boolean {
    return this.orderGroups.isEmptyById(beverageId);
  }

  public addOrder(order: Order): void {
    this.orderGroups.addOrder(order);
  }

  public removeOrder(order: Order): void {
    this.orderGroups.removeOrder(order);
  }

  public firstOrder(): Order {
    return this.orderGroups.firstOrder();
  }

  public addServing(serving: Serving) {
    this.servings.add(serving);
  }

  public getOrderAll() {
    return this.orderGroups.getOrderAll();
  }

  public getServingAll() {
    return this.servings.getAll();
  }
}
