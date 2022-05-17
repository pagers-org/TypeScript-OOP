import { Component } from '@/components';
import { ModalView } from './ModalView';
import { Beverage, Order, Serving } from '@/domain';
import { dispatchCustomEvent } from '@/common';
import { EVENT } from '@/constant';
import { OPTION_GROUP_NAMES } from '@/@types';
import { getBeverageName } from '@/cafe';

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
    this.$closeButton.addEventListener('click', e => {
      e.preventDefault();

      this.close();
    });

    this.$optionGroups.forEach($optionGroup => {
      const groupName = $optionGroup.dataset['groupName'];
      const $inputs = Array.from($optionGroup.querySelectorAll('input'));

      $inputs.forEach($input => {
        $input.addEventListener('change', e => {
          e.preventDefault();

          const value = $input.value;
          const order = this.order;

          dispatchCustomEvent(EVENT.CHANGE_OPTION, { order, groupName, value });

          this.updateOrderInfo();
        });
      });
    });

    this.$servingButton.addEventListener('click', e => {
      e.preventDefault();

      try {
        this.order.validate();

        const servingOrder = this.cafe.firstOrderShift();

        if (servingOrder) {
          dispatchCustomEvent(EVENT.ORDER_REMOVED, { order: servingOrder });

          const serving = new Serving(
            servingOrder.getId(),
            getBeverageName(servingOrder.getBeverageId()),
            servingOrder.getOrderTime(),
          );

          dispatchCustomEvent(EVENT.SERVING, { serving });

          this.cafe.addServing(serving);
          this.close();
          alert('서빙이 완료되었습니다');

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

    dispatchCustomEvent(EVENT.MODAL_OPEN, { opened: true });
  }

  public close() {
    this.remove();

    dispatchCustomEvent(EVENT.MODAL_OPEN, { opened: false });
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

  protected view() {
    return ModalView(this.order, this.beverage);
  }
}
