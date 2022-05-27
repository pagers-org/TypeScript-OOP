import { OrderGroup } from '@/domain/order/OrderGroup';

export class OrderGroups {
  private orderGroups: OrderGroup[] = [];

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
      throw new Error();
    }

    return this.orderGroups[0];
  }

  public find(groupId: number): OrderGroup {
    const result = this.orderGroups.find(orderGroup => orderGroup.getId() === groupId);
    return result ? result : new OrderGroup({ id: groupId });
  }
}
