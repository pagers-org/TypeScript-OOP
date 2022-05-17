import { OrderItemType } from '../@types';

export default class OrderModel {
  constructor(orders: Array<OrderItemType> = []) {
    this.orders = orders;
  }
  add(order: OrderItemType) {
    this.orders = [...this.orders, { ...order }];
  }
  remove(_id: string) {
    this.orders = [...this.orders].filter(singleOrder => singleOrder._id !== _id);
  }
  modify(modified: OrderItemType) {
    const modifiedOrder = [...this.orders].map(order => (order._id === modified._id ? modified : order));
    this.orders = [...modifiedOrder];
  }
}
