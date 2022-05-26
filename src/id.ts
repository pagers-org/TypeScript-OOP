export default class Id {
  private orderId: number;

  constructor() {
    this.orderId = 0;
  }

  get OrderId() {
    return this.orderId;
  }

  addOrderId() {
    this.orderId = this.orderId + 1;
  }
}
