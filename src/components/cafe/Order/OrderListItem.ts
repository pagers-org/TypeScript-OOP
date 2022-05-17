import { EVENT } from '@/constant';
import { Component } from '@/components';
import { Order } from '@/domain';
import { addCustomEventListener, dispatchCustomEvent } from '@/common';
import { Cafe, getBeverageName } from '@/cafe';
import { template } from './OrderListItem.template';
import { OPTION_GROUP_NAMES, OrderChangeType } from '@/@types';

export class OrderListItem extends Component {
  private order!: Order;

  private $removeOrderButton!: HTMLElement;
  private $editOrderButton!: HTMLElement;
  private $no!: HTMLElement;

  public setCafeWithOrder(cafe: Cafe, order: Order) {
    this.cafe = cafe;
    this.order = order;
  }

  protected bindElements() {
    this.$removeOrderButton = this.$container.querySelector('.remove-order') as HTMLElement;
    this.$editOrderButton = this.$container.querySelector('.edit-order') as HTMLElement;
    this.$no = this.$container.querySelector('[data-title="No"]') as HTMLElement;
  }

  protected bindListeners() {
    addCustomEventListener(EVENT.CHANGE_OPTION, e => {
      const { order }: OrderChangeType = e.detail;

      if (order === this.order) {
        this.updateOptions();
      }
    });
  }

  protected bindEvents() {
    this.$removeOrderButton.addEventListener('click', e => {
      e.preventDefault();

      this.removeOrder();
    });

    this.$editOrderButton.addEventListener('click', e => {
      e.preventDefault();

      console.log(1);

      this.toggleEditMode();
    });
  }

  public setNo(no: number) {
    this.$no.textContent = `${no}`;
  }

  public getDataId() {
    return `${this.$container.dataset['orderId']}`;
  }

  public removeOrder() {
    dispatchCustomEvent(EVENT.ORDER_LIST_ITEM_REMOVED, { order: this.order });

    this.$container.remove();

    dispatchCustomEvent(EVENT.ORDER_REMOVED, { order: this.order });
  }

  private updateOptions() {
    OPTION_GROUP_NAMES.forEach(optionGroupName => {
      const $el = this.$container.querySelector(`[data-title="${optionGroupName}"]`) as HTMLElement;
      $el.textContent = this.order.getSelectedOptionValue(optionGroupName);
    });
  }

  private toggleEditMode() {
    const key = 'contentEditAble';

    const contentEditAble = this.$container.getAttribute(key);

    if (contentEditAble === 'true') {
      this.order.validate();

      this.$container.removeAttribute(key);
    } else {
      this.$container.setAttribute(key, 'true');
    }
  }

  protected template() {
    const order = this.order;
    const beverageName = getBeverageName(order.getBeverageId());

    return template(beverageName, order);
  }
}
