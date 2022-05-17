import { Component } from '@/components';
import { template } from './Modal.template';
import { Beverage, Order, Serving } from '@/domain';
import { dispatchCustomEvent } from '@/common';
import { EVENT } from '@/constant';
import { OPTION_GROUP_NAMES } from '@/@types';

const CLASS_NAME_HIDDEN = 'hidden';

export class Modal extends Component {
  private $closeButton!: HTMLElement;
  private $servingButton!: HTMLElement;
  private $optionGroups!: HTMLElement[];
  private $orderInfo!: HTMLElement;

  private order!: Order;
  private beverage!: Beverage;

  protected bindElements() {
    this.$closeButton = this.$container.querySelector('#close-icon') as HTMLElement;
    this.$optionGroups = Array.from(this.$container.querySelectorAll('.option-group'));
    this.$orderInfo = this.$container.querySelector('.order-info') as HTMLElement;
    this.$servingButton = this.$container.querySelector('.serving-button') as HTMLElement;
  }

  protected bindEvents() {
    this.$closeButton.addEventListener('click', () => {
      this.close();
    });

    this.$optionGroups.forEach($optionGroup => {
      const groupName = $optionGroup.dataset['groupName'];
      const $inputs = Array.from($optionGroup.querySelectorAll('input'));

      $inputs.forEach($input => {
        $input.addEventListener('change', () => {
          const value = $input.value;
          const order = this.order;

          dispatchCustomEvent(EVENT.CHANGE_OPTION, { order, groupName, value });

          this.updateOrderInfo();
        });
      });
    });

    this.$servingButton.addEventListener('click', () => {
      try {
        this.order.validate();

        const servingOrder = this.cafe.firstOrderShift();

        if (servingOrder) {
          dispatchCustomEvent(EVENT.ORDER_REMOVED, { order: servingOrder });

          const serving = new Serving(servingOrder);

          dispatchCustomEvent(EVENT.SERVING, { serving });

          this.cafe.addServing(serving);
          this.close();

          dispatchCustomEvent(EVENT.SERVED, { serving });
        }
      } catch (e) {
        return alert((e as Error).message);
      }
    });
  }

  public setOrderWithBeverage(order: Order, beverage: Beverage) {
    this.order = order;
    this.beverage = beverage;
  }

  public open(order: Order, beverage: Beverage) {
    this.setOrderWithBeverage(order, beverage);
    document.body.appendChild(this);
    this.updateOrderInfo();
    this.show();
  }

  public close() {
    this.$container.remove();
  }

  private updateOrderInfo() {
    OPTION_GROUP_NAMES.forEach(optionGroupName => {
      const $el = this.$orderInfo.querySelector(`[data-title="${optionGroupName}"]`) as HTMLElement;
      $el.textContent = this.order.getSelectedOptionValue(optionGroupName);
    });
  }

  private show(): void {
    this.$container.classList.remove(CLASS_NAME_HIDDEN);
  }

  protected template() {
    return template(this.order, this.beverage);
  }
}
