import { BeverageName } from '@/@types';

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
    return this.orderTime;
  }

  public getServingTime() {
    return this.servingTime;
  }

  public getBeverageName() {
    return this.beverageName;
  }

  public getOrderId() {
    return this.orderId;
  }
}
