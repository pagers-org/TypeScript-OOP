import { Order } from '@/domain';
import { OrderGroup } from '@/domain/order/OrderGroup';

export class Orders {
  private orderGroups: OrderGroup[] = [];

  public addOrder(order: Order): void {
    const orderGroup = this.getOrderGroup(order.getBeverageId());

    if (orderGroup.isEmpty()) {
      this.orderGroups.push(orderGroup);
    }

    orderGroup.add(order);
  }

  public removeOrder(order: Order): void {
    const orderGroup = this.getOrderGroup(order.getBeverageId());
    orderGroup.remove(order);

    if (orderGroup.isEmpty()) {
      this.orderGroups = this.orderGroups.filter(orderGroup => orderGroup.getId() !== order.getBeverageId());
    }
  }

  public isEmptyOrderGroup(groupId: number) {
    return this.getOrderGroup(groupId).isEmpty();
  }

  public firstOrderShift(): Order {
    const order = this.firstOrderGroup().shift();

    if (order) {
      this.removeOrder(order);
    }

    return order as Order;
  }

  public firstOrder(): Order {
    const order = this.firstOrderGroup().first();

    if (!order) {
      throw new Error();
    }

    return order;
  }

  public isEmpty(): boolean {
    return this.orderGroups.length == 0;
  }

  private firstOrderGroup(): OrderGroup {
    if (this.isEmpty()) {
      throw new Error();
    }

    return this.orderGroups[0];
  }

  private getOrderGroup(groupId: number): OrderGroup {
    const result = this.orderGroups.find(orderGroup => orderGroup.getId() === groupId);
    return result ? result : new OrderGroup(groupId);
  }
}
