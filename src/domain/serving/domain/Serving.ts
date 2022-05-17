import moment from 'moment';
import { BeverageName } from '@/@types';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export class Serving {
  private readonly orderId: string;
  private readonly beverageName: BeverageName;
  private readonly orderTime: Date;
  private readonly servingTime: Date;

  constructor(orderId: string, beverageName: BeverageName, orderTime: Date, servingTime: Date = new Date()) {
    this.orderId = orderId;
    this.beverageName = beverageName;
    this.orderTime = orderTime;
    this.servingTime = servingTime;
  }

  public getOrderTime() {
    return moment(this.orderTime).format(DATE_FORMAT);
  }

  public getServingTime() {
    return moment(this.servingTime).format(DATE_FORMAT);
  }

  public getBeverageName() {
    return this.beverageName;
  }

  public getOrderId() {
    return this.orderId;
  }
}
