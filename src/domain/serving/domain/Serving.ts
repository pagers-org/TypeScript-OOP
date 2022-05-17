import { Order } from '@/domain';
import { getBeverageById } from '@/cafe';
import { createElement } from '@/common';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export class Serving {
  private readonly order: Order;
  private readonly servingTime: Date;

  constructor(order: Order, servingTime: Date = new Date()) {
    this.order = order;
    this.servingTime = servingTime;
  }

  private getOrderTime() {
    return moment(this.order.getOrderTime()).format(DATE_FORMAT);
  }

  private getServingTime() {
    return moment(this.servingTime).format(DATE_FORMAT);
  }

  public getOrderId() {
    return this.order.getId();
  }

  public toElement(): HTMLElement {
    const beverage = getBeverageById(this.order.getBeverageId());

    return createElement(`
    <div class="table-row" data-id='${this.order.getId()}'>
      <div class="cell" data-title="No"></div>
      <div class="cell" data-title="메뉴">${beverage.getName()}</div>
      <div class="cell" data-title="최근 주문 시간">${this.getOrderTime()}</div>
      <div class="cell" data-title="최근 서빙 완료 시간">${this.getServingTime()}</div>
    </div>
    `);
  }
}
