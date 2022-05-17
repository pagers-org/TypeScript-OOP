import { EVENT } from '@/constant';
import { BaseComponent, OrderListItem } from '@/components';
import { addCustomEventListener, Component, dispatchCustomEvent } from '@/common';
import { createRandomOrder } from '@/cafe';
import { Order, Serving } from '@/domain';
import { OrderListView } from './OrderListView';

@Component('cafe-order-list')
export class OrderList extends BaseComponent {
  private $orderTable!: HTMLElement;
  private $orderButton!: HTMLElement;
  private $listItemElements: OrderListItem[] = [];

  protected bindElements() {
    this.$orderTable = this.$container.querySelector('#order-table') as HTMLElement;
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;
  }

  protected bindListeners() {
    addCustomEventListener(EVENT.ORDER_LIST_ITEM_REMOVED, e => {
      const order = e.detail.order as Order;
      this.removeOrderListItem(order.getId());
    });

    addCustomEventListener(EVENT.SERVING, e => {
      const serving = e.detail.serving as Serving;
      this.removeOrderListItem(serving.getOrderId());
    });
  }

  protected bindEvents() {
    this.$orderButton.addEventListener('click', e => {
      e.preventDefault();
      this.addOrder(createRandomOrder());
    });
  }

  private removeOrderListItem(orderId: string) {
    this.removeListItemElement(this.findOrderListItemElement(orderId));
    this.updateListItemNo();
  }

  private addOrder(order: Order): void {
    this.addListItem(this.createListItem(order));
    this.updateListItemNo();

    dispatchCustomEvent(EVENT.ORDER_ADDED, { order });
  }

  private removeListItemElement(orderListItem: OrderListItem | undefined) {
    if (!orderListItem) {
      throw new Error();
    }

    this.findOrderListItemElement(orderListItem.getDataId())?.remove();
    this.removeOrderListItemElement(orderListItem);
  }

  private findOrderListItemElement(orderId: string) {
    return this.$listItemElements.find($listItem => $listItem.getDataId() === orderId);
  }

  private removeOrderListItemElement(orderListItem: OrderListItem) {
    this.$listItemElements = this.$listItemElements.filter(o => o !== orderListItem);
  }

  private createListItem(order: Order): OrderListItem {
    const $orderListItem = this.createComponent('cafe-order-list-item') as OrderListItem;
    $orderListItem.setOrder(order);
    return $orderListItem;
  }

  private addListItem(orderListItem: OrderListItem) {
    this.$orderTable.appendChild(orderListItem);
    this.$listItemElements.push(orderListItem);
  }

  private updateListItemNo() {
    this.$listItemElements.forEach((orderListItem, index) => {
      orderListItem.setNo(index + 1);
    });
  }

  protected view() {
    return OrderListView();
  }
}
