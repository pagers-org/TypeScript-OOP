import { Order } from '@/domain';
import { OrderGroups } from '@/domain/order/group/OrderGroups';

export class Orders {
  private orderGroups: OrderGroups = new OrderGroups();

  public addOrder(order: Order): void {
    const orderGroup = this.orderGroups.add(order.getBeverageId());
    orderGroup.add(order);
  }

  public removeOrder(order: Order): void {
    const orderGroup = this.orderGroups.find(order.getBeverageId());
    orderGroup.remove(order);

    if (orderGroup.isEmpty()) {
      this.orderGroups.remove(order.getBeverageId());
    }
  }

  public isEmptyOrderGroup(groupId: number) {
    return this.orderGroups.isEmptyById(groupId);
  }

  public firstOrderShift(): Order {
    const order = this.orderGroups.first().shift();

    if (order) {
      this.removeOrder(order);
    }

    return order as Order;
  }

  public firstOrder(): Order {
    const order = this.orderGroups.first().firstOrder();

    if (!order) {
      throw new Error();
    }

    return order;
  }

  public isEmpty(): boolean {
    return this.orderGroups.isEmpty();
  }
}
