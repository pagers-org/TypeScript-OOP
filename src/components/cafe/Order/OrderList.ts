import { EVENT } from '@/constant';
import { Component, OrderListItem } from '@/components';
import { dispatchCustomEvent } from '@/common';
import { createRandomOrder } from '@/cafe';
import { Order } from '@/domain';
import { template } from './OrderList.template';

export class OrderList extends Component {
  private $orderTable!: HTMLElement;
  private $orderButton!: HTMLElement;

  init() {
    this.$orderTable = this.$container.querySelector('#order-table') as HTMLElement;
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;
  }

  bindEvents() {
    this.$orderButton.addEventListener('click', e => {
      e.preventDefault();

      this.addOrder(createRandomOrder());
    });
  }

  addOrder(order: Order): void {
    this.$orderTable.appendChild(this.createListItem(order));
    dispatchCustomEvent(EVENT.ORDER_ADDED, { order });
  }

  createListItem(order: Order): OrderListItem {
    const $orderListItem = document.createElement('cafe-order-list-item') as OrderListItem;
    $orderListItem.setCafeWithOrder(this.cafe, order);
    return $orderListItem;
  }

  template() {
    return template;
  }
}
