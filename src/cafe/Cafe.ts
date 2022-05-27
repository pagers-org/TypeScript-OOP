import { Order, Serving, Servings } from '@/domain';
import { OrderGroups } from '@/domain/order/group/OrderGroups';
import { CafeStorage } from '@/cafe/CafeStorage';

export type CafeConstructor = {
  orderGroups: OrderGroups;
  servings: Servings;
  storage: CafeStorage;
};

export class Cafe {
  private readonly orderGroups: OrderGroups;
  private readonly servings: Servings;
  private readonly storage: CafeStorage;

  constructor(constructor: CafeConstructor) {
    this.orderGroups = constructor.orderGroups;
    this.servings = constructor.servings;
    this.storage = constructor.storage;
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

  public saveOrders() {
    this.storage.saveOrders(this.orderGroups.getOrderAll());
  }

  public saveServings() {
    this.storage.saveServings(this.servings.getAll());
  }

  public getOrderAllFromStorage() {
    return this.storage.getOrders();
  }

  public getServingAllFromStorage() {
    return this.storage.getServings();
  }
}
