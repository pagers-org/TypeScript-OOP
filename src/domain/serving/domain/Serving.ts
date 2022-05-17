import { Order } from '@/domain';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export class Serving {
  private readonly order: Order;
  private readonly servingTime: Date;

  constructor(order: Order, servingTime: Date = new Date()) {
    this.order = order;
    this.servingTime = servingTime;
  }

  public getOrderTime() {
    return moment(this.order.getOrderTime()).format(DATE_FORMAT);
  }

  public getServingTime() {
    return moment(this.servingTime).format(DATE_FORMAT);
  }

  public getOrderId() {
    return this.order.getId();
  }

  public getBeverageId() {
    return this.order.getBeverageId();
  }
}
