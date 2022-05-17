import { Order } from '@/domain';

export class OrderGroup {
  private readonly id: number;
  private orderList: Order[];

  constructor(id: number, orderList: Order[] = []) {
    this.orderList = orderList;
    this.id = id;
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

  public first(): Order {
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
