import { Order } from '@/domain';

export type OrdersConstructor = {
  orders: Order[];
};

export class Orders {
  private orders: Order[];

  constructor(constructor: OrdersConstructor) {
    this.orders = constructor.orders || [];
  }

  public add(order: Order): void {
    this.orders = [...this.orders, order];
  }

  public remove(order: Order): void {
    this.orders = this.orders.filter(item => item.getId() !== order.getId());
  }

  public findOrder(order: Order) {
    return this.orders.find(item => item.getId() === order.getId());
  }

  public firstOrder(): Order {
    if (this.isEmpty()) {
      throw new Error();
    }

    return this.orders[0];
  }

  public shiftOrder(): Order | undefined {
    return this.orders.shift();
  }

  public size(): number {
    return this.orders.length;
  }

  public isEmpty(): boolean {
    return this.size() == 0;
  }
}
