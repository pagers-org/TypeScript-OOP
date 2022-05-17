import { EVENT } from '@/constant';
import { Component, OrderListItem } from '@/components';
import { addCustomEventListener, dispatchCustomEvent } from '@/common';
import { createRandomOrder } from '@/cafe';
import { Order, Serving } from '@/domain';
import { template } from './OrderList.template';

export class OrderList extends Component {
  private $orderTable!: HTMLElement;
  private $orderButton!: HTMLElement;
  private $orderListItems: OrderListItem[] = [];

  protected bindElements() {
    this.$orderTable = this.$container.querySelector('#order-table') as HTMLElement;
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;
  }

  protected bindListeners() {
    addCustomEventListener(EVENT.ORDER_LIST_ITEM_REMOVED, e => {
      const order = e.detail.order as Order;

      this.removeListItem(this.getOrderListItem(order.getId()));
      this.updateListItemNo();
    });

    addCustomEventListener(EVENT.SERVING, e => {
      const serving = e.detail.serving as Serving;

      this.removeListItem(this.getOrderListItem(serving.getOrderId()));
      this.updateListItemNo();
    });
  }

  protected bindEvents() {
    this.$orderButton.addEventListener('click', e => {
      e.preventDefault();

      this.addOrder(createRandomOrder());
    });
  }

  private getOrderListItem(orderId: string) {
    return this.$orderListItems.find($listItem => $listItem.getDataId() === orderId);
  }

  private addOrder(order: Order): void {
    this.addListItem(this.createListItem(order));
    this.updateListItemNo();

    dispatchCustomEvent(EVENT.ORDER_ADDED, { order });
  }

  private removeListItem(orderListItem: OrderListItem | undefined) {
    if (!orderListItem) {
      throw new Error();
    }

    this.findListItem(orderListItem.getDataId())?.removeOrder();
    this.$orderListItems = this.$orderListItems.filter(o => o !== orderListItem);
  }

  private createListItem(order: Order): OrderListItem {
    const $orderListItem = document.createElement('cafe-order-list-item') as OrderListItem;
    $orderListItem.setCafeWithOrder(this.cafe, order);
    return $orderListItem;
  }

  private addListItem(orderListItem: OrderListItem) {
    this.$orderTable.appendChild(orderListItem);
    this.$orderListItems.push(orderListItem);
  }

  private findListItem(id: string): OrderListItem | undefined {
    return this.$orderListItems.find(item => item.getDataId() === id);
  }

  private updateListItemNo() {
    this.$orderListItems.forEach((orderListItem, index) => {
      orderListItem.setNo(index + 1);
    });
  }

  protected template() {
    return template;
  }
}
