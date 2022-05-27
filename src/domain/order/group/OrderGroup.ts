import { Order, Orders } from '@/domain';

export type OrderGroupConstructor = {
  id: number;
  orders?: Orders;
};

export class OrderGroup {
  private readonly id: number;
  private orders: Orders;

  constructor(constructor: OrderGroupConstructor) {
    this.id = constructor.id;
    this.orders = constructor.orders || new Orders({ orders: [] });
  }

  public getId() {
    return this.id;
  }

  public add(order: Order): void {
    this.orders.add(order);
  }

  public remove(order: Order): void {
    this.orders.remove(order);
  }

  public findOrder(order: Order) {
    return this.orders.findOrder(order);
  }

  public firstOrder(): Order {
    return this.orders.firstOrder();
  }

  public shiftOrder(): Order | undefined {
    return this.orders.shiftOrder();
  }

  public size(): number {
    return this.orders.size();
  }

  public isEmpty(): boolean {
    return this.size() == 0;
  }
}
