import { Component } from '@/components';
import { ModalView } from './ModalView';
import { Beverage, Order, Serving } from '@/domain';
import { dispatchCustomEvent } from '@/common';
import { OPTION_GROUP_NAMES } from '@/@types';
import { EVENT } from '@/events';

const CLASS_NAME_HIDDEN = 'hidden';

export type OptionInput = {
  groupName: string;
  elements: HTMLInputElement[];
};

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

  public setOrder(order: Order) {
    this.order = order;
  }

  public setBeverage(beverage: Beverage) {
    this.beverage = beverage;
  }

  protected bindEvents() {
    this.$closeButton.addEventListener('click', e => {
      e.preventDefault();

      this.close();
    });

    this.getOptionInputs().forEach(item => {
      const { groupName, elements } = item;

      elements.forEach($input => {
        $input.addEventListener('change', e => {
          e.preventDefault();

          this.optionChanged(groupName, $input.value);
        });
      });
    });

    this.$servingButton.addEventListener('click', e => {
      e.preventDefault();

      try {
        this.order.validate();

        this.serving(this.order);
      } catch (e) {
        return alert((e as Error).message);
      }
    });
  }

  private serving(order: Order) {
    dispatchCustomEvent(EVENT.ORDER_REMOVED, { order: order });

    const serving = new Serving(order.getId(), this.cafe.findBeverageName(order.getBeverageId()), order.getOrderTime());

    dispatchCustomEvent(EVENT.BEFORE_SERVING, { order, serving });

    this.close();

    alert('서빙이 완료되었습니다');

    dispatchCustomEvent(EVENT.AFTER_SERVING, { serving });
  }

  public open(order: Order, beverage: Beverage) {
    this.setOrder(order);
    this.setBeverage(beverage);

    document.body.appendChild(this);

    this.updateOrderInfo();
    this.show();

    dispatchCustomEvent(EVENT.MODAL_OPEN, { opened: true });
  }

  public close() {
    this.remove();

    dispatchCustomEvent(EVENT.MODAL_OPEN, { opened: false });
  }

  private getOptionInputs(): OptionInput[] {
    const result: OptionInput[] = [];

    this.$optionGroups.forEach($optionGroup => {
      const groupName = `${$optionGroup.dataset['groupName']}`;
      const elements = Array.from($optionGroup.querySelectorAll('input'));

      result.push({ groupName, elements });
    });

    return result;
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

  private optionChanged(groupName: string, value: string) {
    dispatchCustomEvent(EVENT.CHANGE_OPTION, { order: this.order, groupName, value });

    this.updateOrderInfo();
  }

  protected view() {
    return ModalView(this.order, this.beverage);
  }
}
