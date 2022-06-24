import { Component, OrderListItem } from '@/components';
import { Order } from '@/domain';
import { OrderListView } from './OrderListView';
import { CUSTOM_ELEMENTS, eventDispatcher, eventListener } from '@/main';
import { createRandomOrder, createRandomOrderByBeverageId } from '@/common';

export class OrderList extends Component {
  private $orderTable!: HTMLElement;
  private $orderButton!: HTMLElement;
  private $listItemElements: OrderListItem[] = [];

  protected mounted() {
    setTimeout(() => {
      this.addOrderAll(this.cafe.getOrderAllFromStorage());
    }, 20);
  }

  protected bindElements() {
    this.$orderTable = this.$container.querySelector('#order-table') as HTMLElement;
    this.$orderButton = this.$container.querySelector('.order-button') as HTMLElement;
  }

  protected bindListeners() {
    eventListener
      .orderRemoved(({ order }) => {
        this.removeOrderListItem(order.getId());
      })
      .beforeServing(({ serving }) => {
        this.removeOrderListItem(serving.getOrderId());
      })
      .menuButtonClick(async ({ button }) => {
        this.addOrder(await createRandomOrderByBeverageId(button.getMenuId()));
        this.cafe.saveOrders();
      });
  }

  protected bindEvents() {
    this.$orderButton.addEventListener('click', async e => {
      e.preventDefault();

      this.addOrder(await createRandomOrder());
      this.cafe.saveOrders();
    });
  }

  private removeOrderListItem(orderId: string) {
    const $el = this.findOrderListItemElement(orderId);
    this.removeListItemElement($el);
    this.updateListItemNo();
  }

  private addOrderAll(orders: Order[]) {
    orders.forEach(order => this.addOrder(order));
  }

  private addOrder(order: Order) {
    const listItem = this.createListItem(order);

    this.addListItem(listItem);
    this.updateListItemNo();

    eventDispatcher.orderAdded({ order });
  }

  private removeListItemElement(orderListItem: OrderListItem | undefined) {
    if (!orderListItem) {
      return;
    }

    const $el = this.findOrderListItemElement(orderListItem.getDataId());

    if ($el) {
      $el.remove();
    }

    this.removeOrderListItemElement(orderListItem);
  }

  private findOrderListItemElement(orderId: string) {
    return this.$listItemElements.find($listItem => $listItem.getDataId() === orderId);
  }

  private removeOrderListItemElement(orderListItem: OrderListItem) {
    this.$listItemElements = this.$listItemElements.filter(o => o !== orderListItem);
  }

  private createListItem(order: Order): OrderListItem {
    const $orderListItem = this.createComponent<OrderListItem>(CUSTOM_ELEMENTS.ORDER_LIST_ITEM);
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
