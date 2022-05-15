import { Order } from '@/domain';

export class Orders {
  private orderData = new Map<number, Order[]>();

  public add(order: Order): void {
    this.orderData.set(order.beverageId, [...this.getListByBeverageId(order.beverageId), order]);
  }

  public remove(order: Order): void {
    const filteredList = this.getListByBeverageId(order.beverageId).filter(item => item.id !== order.id);
    this.orderData.set(order.beverageId, [...filteredList]);
  }

  public getListByBeverageId(beverageId: number): Order[] {
    const result = this.orderData.get(beverageId);
    return result ? result : [];
  }

  public getFirstByBeverageId(beverageId: number): Order | undefined {
    return [...this.getListByBeverageId(beverageId)].shift();
  }

  public getOrderSize(): number {
    return this.getOrderValues().length;
  }

  public isEmptyOrder(): boolean {
    return this.getOrderSize() == 0;
  }

  public isEmptyByBeverageId(beverageId: number): boolean {
    return this.getListByBeverageId(beverageId).length == 0;
  }

  private getOrderValues(): Order[] {
    const orderRows: Order[][] = Array.from(this.orderData.values());

    return orderRows.reduce((list, orders) => {
      return [...list, ...orders];
    }, []);
  }
}
