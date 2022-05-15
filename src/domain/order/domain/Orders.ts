import { Order } from '@/domain';

export class Orders {
  public orderData = new Map<number, Order[]>();

  public add(order: Order) {
    this.orderData.set(order.beverageId, [...this.getListByBeverageId(order.beverageId), order]);
  }

  public remove(order: Order) {
    const filteredList = this.getListByBeverageId(order.beverageId).filter(item => item.id !== order.id);
    this.orderData.set(order.beverageId, [...filteredList]);
  }

  public getListByBeverageId(beverageId: number) {
    const result = this.orderData.get(beverageId);
    return result ? result : [];
  }

  public getFirstByBeverageId(beverageId: number) {
    return [...this.getListByBeverageId(beverageId)].shift();
  }

  public getOrderValues() {
    const orderRows: Order[][] = Array.from(this.orderData.values());

    return orderRows.reduce((list, orders) => {
      return [...list, ...orders];
    }, []);
  }

  public getOrderSize() {
    return this.getOrderValues().length;
  }

  public isEmptyOrder() {
    return this.getOrderSize() == 0;
  }

  public isEmptyByBeverageId(beverageId: number) {
    return this.getListByBeverageId(beverageId).length == 0;
  }
}
