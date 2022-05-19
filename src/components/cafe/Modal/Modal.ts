import { Component } from '@/components';
import { ModalView } from './ModalView';
import { Serving } from '@/domain';
import { OPTION_GROUP_NAMES, OptionGroupName } from '@/@types';
import { CafeOrder } from '@/cafe';

const CLASS_NAME_HIDDEN = 'hidden';

export type OptionInput = {
  groupName: OptionGroupName;
  elements: HTMLInputElement[];
};

export class Modal extends Component {
  private $closeButton!: HTMLElement;
  private $servingButton!: HTMLElement;
  private $optionGroups!: HTMLElement[];
  private $orderInfo!: HTMLElement;

  private cafeOrder!: CafeOrder;

  protected bindElements() {
    this.$closeButton = this.$container.querySelector('#close-icon') as HTMLElement;
    this.$optionGroups = Array.from(this.$container.querySelectorAll('.option-group'));
    this.$orderInfo = this.$container.querySelector('.order-info') as HTMLElement;
    this.$servingButton = this.$container.querySelector('.serving-button') as HTMLElement;
  }

  public setOrder(cafeOrder: CafeOrder) {
    this.cafeOrder = cafeOrder;
  }

  protected mounted() {
    this.updateOrderInfo();
    this.show();
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
        this.cafeOrder.order.validate();

        this.serving(this.cafeOrder);
      } catch (e) {
        return alert((e as Error).message);
      }
    });
  }

  private async serving(cafeOrder: CafeOrder) {
    this.cafe.getEventDispatcher().orderRemoved({ order: cafeOrder.order });

    const orderId = cafeOrder.order.getId();
    const beverageName = cafeOrder.beverage.getName();
    const orderTime = cafeOrder.order.getOrderTime();

    const serving = new Serving({ orderId, beverageName, orderTime });

    this.cafe.getEventDispatcher().beforeServing({ order: cafeOrder.order, serving });

    this.close();

    alert('서빙이 완료되었습니다');

    this.cafe.getEventDispatcher().afterServing({ serving });
  }

  public open(cafeOrder: CafeOrder) {
    this.setOrder(cafeOrder);

    document.body.appendChild(this);

    this.cafe.getEventDispatcher().modalOpen({ opened: true });
  }

  public close() {
    this.remove();

    this.cafe.getEventDispatcher().modalOpen({ opened: false });
  }

  private getOptionInputs(): OptionInput[] {
    const result: OptionInput[] = [];

    this.$optionGroups.forEach($optionGroup => {
      const groupName = `${$optionGroup.dataset['groupName']}` as OptionGroupName;
      const elements = Array.from($optionGroup.querySelectorAll('input'));

      result.push({ groupName, elements });
    });

    return result;
  }

  private updateOrderInfo() {
    OPTION_GROUP_NAMES.forEach(optionGroupName => {
      const $el = this.$orderInfo.querySelector(`[data-title="${optionGroupName}"]`) as HTMLElement;
      $el.textContent = this.cafeOrder.order.getSelectedOptionValue(optionGroupName);
    });
  }

  private show(): void {
    this.$container.classList.remove(CLASS_NAME_HIDDEN);
  }

  private optionChanged(groupName: OptionGroupName, value: string) {
    this.cafe.getEventDispatcher().optionChanged({ order: this.cafeOrder.order, groupName, value });

    this.updateOrderInfo();
  }

  protected view() {
    return ModalView(this.cafeOrder.order, this.cafeOrder.beverage);
  }
}
