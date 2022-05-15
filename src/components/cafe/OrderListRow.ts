import { Component } from '@/components';
import { Order } from '@/domain';
import { EVENT } from '@/constant';
import { getBeverageName } from '@/domain/util/util';
import { dispatchCustomEvent } from '@/common';
import { Cafe } from '@/store/Cafe';

export class OrderListRow extends Component {
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

    return String.raw`
<div class='table-row'>
    <div class='cell' data-title='No'>${this.cafe.orders.getOrderSize()}</div>
    <div class='cell' data-title='메뉴명'>${beverageName}</div>
    <div class='cell' data-title='사이즈'>${order.getSelectedOptionValue('사이즈')}</div>
    <div class='cell' data-title='샷'>${order.getSelectedOptionValue('샷')}</div>
    <div class='cell' data-title='시럽'>${order.getSelectedOptionValue('시럽')}</div>
    <div class='cell' data-title='ICE/HOT'>${order.getSelectedOptionValue('ICE/HOT')}</div>
    <div class='cell' data-title='얼음 종류'>${order.getSelectedOptionValue('얼음 종류')}</div>
    <div class='cell' data-title='휘핑 크림'>${order.getSelectedOptionValue('휘핑 크림')}</div>
    <div class='cell' data-title='엑스트라'>${order.getSelectedOptionValue('엑스트라')}</div>
    <div class='cell' data-title='컵'>${order.getSelectedOptionValue('컵')}</div>
    <div class='cell' data-title='수정하기'>
      <span class='edit-order'><i class='fa-solid fa-pen'></i></span>
    </div>
    <div class='cell' data-title='삭제하기'>
      <span class='remove-order'><i class='fa-solid fa-trash-can'></i></span>
    </div>
</div>
    `;
  }
}
