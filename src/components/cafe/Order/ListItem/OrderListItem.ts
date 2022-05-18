import { EVENT } from '@/events';
import { Component } from '@/components';
import { Order } from '@/domain';
import { addCustomEventListener, dispatchCustomEvent } from '@/common';
import { OrderListItemView } from './OrderListItemView';
import { OPTION_GROUP_NAMES, OptionGroupName, OrderChangeType } from '@/@types';

export class OrderListItem extends Component {
  private order!: Order;

  private $removeOrderButton!: HTMLElement;
  private $editOrderButton!: HTMLElement;
  private $no!: HTMLElement;

  public setOrder(order: Order) {
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

      if (order !== this.order) {
        return;
      }

      this.updateOptions();
    });
  }

  protected bindEvents() {
    this.$removeOrderButton.addEventListener('click', e => {
      e.preventDefault();

      this.removeOrder();
    });

    this.$editOrderButton.addEventListener('click', e => {
      e.preventDefault();

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
    dispatchCustomEvent(EVENT.ORDER_REMOVED, { order: this.order });

    this.remove();
  }

  private updateOptions() {
    OPTION_GROUP_NAMES.forEach(optionGroupName => {
      this.setOptionGroupText(optionGroupName);
    });
  }

  private setOptionGroupText(selected: OptionGroupName) {
    const $el = this.getOptionGroupElement(selected);
    $el.textContent = this.order.getSelectedOptionValue(selected);
  }

  private getOptionGroupElement(optionGroupName: OptionGroupName) {
    const selector = `[data-title="${optionGroupName}"]`;
    return this.$container.querySelector(selector) as HTMLElement;
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

  protected view() {
    const order = this.order;
    const beverageName = this.cafe.findBeverageName(order.getBeverageId());

    return OrderListItemView(beverageName, order);
  }
}
