import { EVENT } from '@/constant';
import { Component, OrderListItem } from '@/components';
import { addCustomEventListener, dispatchCustomEvent } from '@/common';
import { createRandomOrder } from '@/cafe';
import { Order } from '@/domain';
import { template } from './OrderList.template';

export class OrderList extends Component {
  private $orderTable!: HTMLElement;
  private $orderButton!: HTMLElement;
  private $orderListItems: OrderListItem[] = [];

  init() {
    this.$orderTable = this.$container.querySelector('#order-table') as HTMLElement;
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;
  }

  bindEvents() {
    this.$orderButton.addEventListener('click', e => {
      e.preventDefault();

      this.addOrder(createRandomOrder());
      this.updateListItemNo();
    });

    addCustomEventListener(EVENT.ORDER_LIST_ITEM_REMOVED, e => {
      const orderListItem = e.detail.orderListItem;

      this.removeOrderListItem(orderListItem);
      this.updateListItemNo();
    });
  }

  removeOrderListItem(orderListItem: OrderListItem) {
    this.$orderListItems = this.$orderListItems.filter(o => o !== orderListItem);
  }

  addOrder(order: Order): void {
    this.$orderTable.appendChild(this.createListItem(order));
    dispatchCustomEvent(EVENT.ORDER_ADDED, { order });
  }

  updateListItemNo() {
    this.$orderListItems.forEach((orderListItem, index) => {
      orderListItem.setNo(index + 1);
    });
  }

  createListItem(order: Order): OrderListItem {
    const $orderListItem = document.createElement('cafe-order-list-item') as OrderListItem;
    $orderListItem.setCafeWithOrder(this.cafe, order);

    this.$orderListItems.push($orderListItem);

    return $orderListItem;
  }

  template() {
    return template;
  }
}
