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

  protected initElements() {
    this.$orderTable = this.$container.querySelector('#order-table') as HTMLElement;
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;
  }

  protected bindListener() {
    addCustomEventListener(EVENT.ORDER_LIST_ITEM_REMOVED, e => {
      const orderListItem = e.detail.orderListItem;

      this.removeOrderListItem(orderListItem);
      this.updateListItemNo();
    });
  }

  protected bindEvents() {
    this.$orderButton.addEventListener('click', e => {
      e.preventDefault();

      this.addOrder(createRandomOrder());
      this.updateListItemNo();
    });
  }

  private removeOrderListItem(orderListItem: OrderListItem) {
    this.$orderListItems = this.$orderListItems.filter(o => o !== orderListItem);
  }

  private addOrder(order: Order): void {
    this.$orderTable.appendChild(this.createListItem(order));
    dispatchCustomEvent(EVENT.ORDER_ADDED, { order });
  }

  private updateListItemNo() {
    this.$orderListItems.forEach((orderListItem, index) => {
      orderListItem.setNo(index + 1);
    });
  }

  private createListItem(order: Order): OrderListItem {
    const $orderListItem = document.createElement('cafe-order-list-item') as OrderListItem;
    $orderListItem.setCafeWithOrder(this.cafe, order);

    this.$orderListItems.push($orderListItem);

    return $orderListItem;
  }

  protected template() {
    return template;
  }
}
