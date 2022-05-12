import { Order } from '@/domain';

export class Orders {
  public static EVENT_ADDED = 'orderAdded';
  public static EVENT_REMOVED = 'orderRemoved';

  public orderData = new Map<number, Order[]>();

  public add(order: Order) {
    this.orderData.set(order.beverageId, [...this.getList(order.beverageId), order]);
  }

  public getList(beverageId: number) {
    const result = this.orderData.get(beverageId);
    return result ? result : [];
  }

  public getFirst(beverageId: number) {
    return [...this.getList(beverageId)].shift();
  }

  public remove(order: Order) {
    const filteredList = this.getList(order.beverageId).filter(item => item.id !== order.id);
    this.orderData.set(order.beverageId, [...filteredList]);
  }

  public values() {
    return Array.from(this.orderData.values()).reduce((list, orders) => {
      return [...list, ...orders];
    }, []);
  }

  public size() {
    return this.values().length;
  }

  public isEmpty() {
    return this.size() == 0;
  }

  public isEmptyByBeverageId(beverageId: number) {
    console.log(this.getList(beverageId));

    return this.getList(beverageId).length == 0;
  }
}
