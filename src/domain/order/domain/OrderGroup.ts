import { Order } from '@/domain';

export class OrderGroup {
  private readonly orderList: Order[];

  constructor(orderList: Order[] = []) {
    this.orderList = orderList;
  }

  public add(order: Order): OrderGroup {
    return new OrderGroup([...this.orderList, order]);
  }

  public remove(order: Order): OrderGroup {
    return new OrderGroup(this.orderList.filter(item => item.id !== order.id));
  }

  public first(): Order | undefined {
    return this.orderList.shift();
  }

  public getOrderList(): Order[] {
    return this.orderList;
  }

  public size(): number {
    return this.orderList.length;
  }

  public isEmpty(): boolean {
    return this.size() == 0;
  }
}
