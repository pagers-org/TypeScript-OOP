import { Order } from '@/domain';
import { OrderGroup } from '@/domain/order/domain/OrderGroup';

export class Orders {
  private orderGroups: OrderGroup[] = [];

  public add(order: Order): void {
    const orderGroup = this.getOrderGroup(order.getBeverageId());

    if (orderGroup.isEmpty()) {
      this.orderGroups.push(orderGroup);
    }

    orderGroup.add(order);
  }

  public firstOrder(): Order {
    const order = this.orderGroups[0].first();

    if (!order) {
      throw new Error();
    }

    return order;
  }

  public remove(order: Order): void {
    const orderGroup = this.getOrderGroup(order.getBeverageId());
    orderGroup.remove(order);

    if (orderGroup.isEmpty()) {
      this.orderGroups = this.orderGroups.filter(orderGroup => orderGroup.getId() !== order.getBeverageId());
    }
  }

  public getOrderGroup(beverageId: number): OrderGroup {
    const result = this.orderGroups.find(orderGroup => orderGroup.getId() === beverageId);
    return result ? result : new OrderGroup(beverageId);
  }

  public isEmpty(): boolean {
    return this.orderGroups.length == 0;
  }
}
