import { BeverageName } from '@/@types';

export type ServingConstructor = {
  orderId: string;
  beverageName: BeverageName;
  orderTime: Date;
  servingTime?: Date;
};

export class Serving {
  private readonly orderId: string;
  private readonly beverageName: BeverageName;
  private readonly orderTime: Date;
  private readonly servingTime?: Date;

  constructor(constructor: ServingConstructor) {
    this.orderId = constructor.orderId;
    this.beverageName = constructor.beverageName;
    this.orderTime = constructor.orderTime;
    this.servingTime = constructor.servingTime || new Date();
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
