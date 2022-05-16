import { Component } from '@/components';
import { Order } from '@/domain';
import { EVENT } from '@/constant';
import { dispatchCustomEvent } from '@/common';
import { template } from './OrderListItem.template';
import { Cafe, getBeverageName } from '@/cafe';

export class OrderListItem extends Component {
  private order!: Order;

  private $removeOrderButton!: HTMLElement;
  private $editOrderButton!: HTMLElement;

  init() {
    this.$removeOrderButton = this.$container.querySelector('.remove-order') as HTMLElement;
    this.$editOrderButton = this.$container.querySelector('.edit-order') as HTMLElement;
  }

  setCafeWithOrder(cafe: Cafe, order: Order) {
    this.cafe = cafe;
    this.order = order;
  }

  bindEvents() {
    this.$removeOrderButton.addEventListener('click', e => {
      e.preventDefault();

      this.removeOrder();
    });

    this.$editOrderButton.addEventListener('click', e => {
      e.preventDefault();

      this.toggleEditMode();
    });
  }

  removeOrder() {
    this.$container.remove();

    dispatchCustomEvent(EVENT.ORDER_REMOVED, { order: this.order });
  }

  toggleEditMode() {
    const key = 'contentEditAble';

    const contentEditAble = this.$editOrderButton.getAttribute(key);

    if (contentEditAble === 'true') {
      this.$editOrderButton.removeAttribute(key);
    } else {
      this.$editOrderButton.setAttribute(key, 'true');
    }
  }

  template() {
    const order = this.order;
    const beverageName = getBeverageName(order.beverageId);

    return template(this.cafe.orders.size() + 1, beverageName, order);
  }
}
