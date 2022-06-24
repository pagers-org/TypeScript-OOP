import { OrderGroup } from '@/domain/order/group/OrderGroup';
import { Order } from '@/domain';

export type OrderGroupsConstructor = {
  orderGroups?: OrderGroup[];
};

export class OrderGroups {
  private orderGroups: OrderGroup[];

  constructor(constructor: OrderGroupsConstructor = { orderGroups: [] }) {
    this.orderGroups = constructor.orderGroups || [];
  }

  public add(groupId: number): OrderGroup {
    const orderGroup = this.find(groupId);

    if (orderGroup.isEmpty()) {
      this.orderGroups.push(orderGroup);
    }

    return orderGroup;
  }

  public remove(groupId: number): void {
    const orderGroup = this.find(groupId);

    if (orderGroup.isEmpty()) {
      this.orderGroups = this.orderGroups.filter(orderGroup => orderGroup.getId() !== groupId);
    }
  }

  public isEmptyById(groupId: number) {
    return this.find(groupId).isEmpty();
  }

  public isEmpty(): boolean {
    return this.orderGroups.length == 0;
  }

  public first(): OrderGroup {
    if (this.isEmpty()) {
      throw new Error('주문이 없습니다');
    }

    return this.orderGroups[0];
  }

  public find(groupId: number): OrderGroup {
    const result = this.orderGroups.find(orderGroup => orderGroup.getId() === groupId);
    return result ? result : new OrderGroup({ id: groupId });
  }

  firstOrder() {
    return this.first().firstOrder();
  }

  addOrder(order: Order) {
    this.add(order.getBeverageId()).add(order);
  }

  removeOrder(order: Order) {
    const orderGroup = this.find(order.getBeverageId());
    orderGroup.remove(order);

    if (orderGroup.isEmpty()) {
      this.remove(order.getBeverageId());
    }
  }

  getOrderAll() {
    const orders: Order[] = [];

    this.orderGroups.forEach(orderGroup => {
      orders.push(...orderGroup.getOrders());
    });

    return orders;
  }
}
