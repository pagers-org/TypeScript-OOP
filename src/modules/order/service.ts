import Order from '@/modules/order/index';
import { OrderType } from '@/modules/order/type';

export class OrderService {
  public orderList: Order[] = [];

  public add(order: Order) {
    if (this.orderList.length === 0) this.orderList.push(order);
    else this.orderList = [...this.orderList, order];
  }

  public delete(orderId: string) {
    console.log('delete', orderId);
    this.orderList = this.orderList.filter(item => item.id !== orderId);
  }

  public update(order: Order) {
    this.orderList = this.orderList.map((item) => ( item.id === order.id ? order : item ))
  }

  public listOrders() {
    return this.orderList;
  }
}
