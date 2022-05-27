import { Order } from '@/domain';

export type OrderGroupConstructor = {
  id: number;
  orderList?: Order[];
};

export class OrderGroup {
  private readonly id: number;
  private orderList: Order[];

  constructor(constructor: OrderGroupConstructor) {
    this.id = constructor.id;
    this.orderList = constructor.orderList || [];
  }

  public getId() {
    return this.id;
  }

  public add(order: Order): void {
    this.orderList = [...this.orderList, order];
  }

  public remove(order: Order): void {
    this.orderList = this.orderList.filter(item => item.getId() !== order.getId());
  }

  public findOrder(order: Order) {
    return this.orderList.find(item => item.getId() === order.getId());
  }

  public firstOrder(): Order {
    if (this.isEmpty()) {
      throw new Error();
    }

    return this.orderList[0];
  }

  public shift(): Order | undefined {
    return this.orderList.shift();
  }

  public size(): number {
    return this.orderList.length;
  }

  public isEmpty(): boolean {
    return this.size() == 0;
  }
}
