import { EVENT } from '@/events';
import { Component, MenuButton, OrderListItem } from '@/components';
import { addCustomEventListener, dispatchCustomEvent } from '@/common';
import { Order, Serving } from '@/domain';
import { OrderListView } from './OrderListView';

export class OrderList extends Component {
  private $orderTable!: HTMLElement;
  private $orderButton!: HTMLElement;
  private $listItemElements: OrderListItem[] = [];

  protected bindElements() {
    this.$orderTable = this.$container.querySelector('#order-table') as HTMLElement;
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;
  }

  protected bindListeners() {
    addCustomEventListener(EVENT.ORDER_REMOVED, e => {
      const order = e.detail.order as Order;
      this.removeOrderListItem(order.getId());
    });

    addCustomEventListener(EVENT.BEFORE_SERVING, e => {
      const serving = e.detail.serving as Serving;
      this.removeOrderListItem(serving.getOrderId());
    });

    addCustomEventListener(EVENT.MENU_BUTTON_CLICK, async e => {
      const menuButton = e.detail.button as MenuButton;
      this.addOrder(await this.cafe.createRandomOrder(menuButton.getMenuId()));
    });
  }

  protected bindEvents() {
    this.$orderButton.addEventListener('click', async e => {
      e.preventDefault();
      this.addOrder(await this.cafe.createRandomBeverageOrder());
    });
  }

  private removeOrderListItem(orderId: string) {
    const $el = this.findOrderListItemElement(orderId);
    this.removeListItemElement($el);
    this.updateListItemNo();
  }

  private addOrder(order: Order): void {
    const listItem = this.createListItem(order);

    this.addListItem(listItem);
    this.updateListItemNo();

    dispatchCustomEvent(EVENT.ORDER_ADDED, { order });
  }

  private removeListItemElement(orderListItem: OrderListItem | undefined) {
    if (!orderListItem) {
      return;
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
      //TODO 수정이 필요함
      setTimeout(() => {
        orderListItem.setNo(index + 1);
      }, 10);
    });
  }

  protected view() {
    return OrderListView();
  }
}
