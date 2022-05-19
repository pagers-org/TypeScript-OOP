import { Component } from '@/components';
import { OrderListItemView } from './OrderListItemView';
import { OPTION_GROUP_NAMES, OptionGroupName } from '@/@types';
import { CafeOrder } from '@/cafe';

export class OrderListItem extends Component {
  private cafeOrder!: CafeOrder;

  private $removeOrderButton!: HTMLElement;
  private $editOrderButton!: HTMLElement;
  private $no!: HTMLElement;

  public setOrder(order: CafeOrder) {
    this.cafeOrder = order;
  }

  protected bindElements() {
    this.$removeOrderButton = this.$container.querySelector('.remove-order') as HTMLElement;
    this.$editOrderButton = this.$container.querySelector('.edit-order') as HTMLElement;
    this.$no = this.$container.querySelector('[data-title="No"]') as HTMLElement;
  }

  protected bindListeners() {
    this.cafe.getEventListener().changedOption(({ order }) => {
      if (order !== this.cafeOrder.order) {
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
    this.cafe.getEventDispatcher().orderRemoved({ order: this.cafeOrder.order });

    this.remove();
  }

  private updateOptions() {
    OPTION_GROUP_NAMES.forEach(optionGroupName => {
      this.setOptionGroupText(optionGroupName);
    });
  }

  private setOptionGroupText(selected: OptionGroupName) {
    const $el = this.getOptionGroupElement(selected);
    $el.textContent = this.cafeOrder.order.getSelectedOptionValue(selected);
  }

  private getOptionGroupElement(optionGroupName: OptionGroupName) {
    const selector = `[data-title="${optionGroupName}"]`;
    return this.$container.querySelector(selector) as HTMLElement;
  }

  private toggleEditMode() {
    const key = 'contentEditAble';

    const contentEditAble = this.$container.getAttribute(key);

    if (contentEditAble === 'true') {
      this.cafeOrder.order.validate();

      this.$container.removeAttribute(key);
    } else {
      this.$container.setAttribute(key, 'true');
    }
  }

  protected async view() {
    return OrderListItemView(this.cafeOrder.beverage.getName(), this.cafeOrder.order);
  }
}
