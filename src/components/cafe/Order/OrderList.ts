import { Component, OrderListItem } from '@/components';
import { Order } from '@/domain';
import { OrderListView } from './OrderListView';
import { api, CUSTOM_ELEMENTS, eventDispatcher, eventListener } from '@/main';
import { getRandomRange } from '@/common';

export class OrderList extends Component {
  private $orderTable!: HTMLElement;
  private $orderButton!: HTMLElement;
  private $listItemElements: OrderListItem[] = [];

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
        const beverage = await api.findBeverage(button.getMenuId());

        await this.addOrder(await Order.RANDOM(beverage, await api.getOptionGroupsAll()));
      });
  }

  protected bindEvents() {
    this.$orderButton.addEventListener('click', async e => {
      e.preventDefault();

      const beveragesCount = await api.getBeveragesCount();
      const randomBeverageId = getRandomRange(1, beveragesCount);
      const beverage = await api.findBeverage(randomBeverageId);

      await this.addOrder(await Order.RANDOM(beverage, await api.getOptionGroupsAll()));
    });
  }

  private removeOrderListItem(orderId: string) {
    const $el = this.findOrderListItemElement(orderId);
    this.removeListItemElement($el);
    this.updateListItemNo();
  }

  private async addOrder(order: Order) {
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
