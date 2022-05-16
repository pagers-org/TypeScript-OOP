import { Order } from '@/domain';
import { OrderGroup } from '@/domain/order/domain/OrderGroup';

export class Orders {
  private orderData = new Map<number, OrderGroup>();

  public add(order: Order): void {
    this.orderData.set(order.beverageId, this.getOrderGroup(order.beverageId).add(order));
  }

  public remove(order: Order): void {
    this.orderData.set(order.beverageId, this.getOrderGroup(order.beverageId).remove(order));
  }

  public getOrderGroup(beverageId: number): OrderGroup {
    const result = this.orderData.get(beverageId);
    return result ? result : new OrderGroup();
  }

  public size(): number {
    return Array.from(this.orderData.values()).reduce((a, b) => a + b.size(), 0);
  }

  public isEmpty(): boolean {
    return this.size() == 0;
  }
}
