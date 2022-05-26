import { Order } from '../domains';

import { DOM, ORDER } from '../constants';
import { $ } from '../utils/dom';
import { ORDER_TEMPLATE } from '../templates';

import type {
  CupType,
  ExtraType,
  IceType,
  MenuNameType,
  MenuSizeType,
  ShotType,
  SyrupType,
  TemporatureType,
  WippedCreamType,
} from '../@types';
import { pickRandomInArray, pickRandomUniqueId } from '../utils/random';

class OrderList {
  #orderList: Order[];
  $table: HTMLElement;

  constructor() {
    this.#orderList = [];
    this.$table = $(`#${DOM.ORDER_TABLE_ID}`);
  }

  addRandomOrder() {
    const newRandomOrder = new Order({
      id: pickRandomUniqueId(),
      menuName: pickRandomInArray<MenuNameType>(ORDER.MENU_NAME),
      size: pickRandomInArray<MenuSizeType>(ORDER.MENU_SIZE),
      shot: pickRandomInArray<ShotType>(ORDER.MENU_SHOT),
      syrup: pickRandomInArray<SyrupType>(ORDER.MENU_SYRUP),
      temporature: pickRandomInArray<TemporatureType>(ORDER.MENU_TEMPORATURE),
      ice: pickRandomInArray<IceType>(ORDER.MENU_ICE),
      wippedCream: pickRandomInArray<WippedCreamType>(ORDER.MENU_WIPPED_CREAM),
      extra: pickRandomInArray<ExtraType>(ORDER.MENU_EXTRA),
      cup: pickRandomInArray<CupType>(ORDER.MENU_CUP),
    });

    this.#orderList = [...this.#orderList, newRandomOrder];
    this.renderOrderList();
  }

  removeOrder(removeId: string) {
    this.#orderList = this.#orderList.filter(order => order.getId() !== removeId);
    this.renderOrderList();
    console.log(this.#orderList);
  }

  editOrder(editId: string) {
    const Order = this.#orderList.find(order => order.getId() === editId);
    const newOrder = $(`[data-id="${editId}"]`).children;
    Array.from(newOrder).forEach(($el, index) => {
      if ($el.getAttribute('data-title') === '수정하기' || $el.getAttribute('data-title') === '삭제하기') return;
      Order?.updateOrder($el.textContent, index);
    });
  }

  getOrderTotalLength(): number {
    return this.#orderList.length;
  }

  getCurrentOrderMenuNames(): MenuNameType[] {
    return this.#orderList.map(order => order.getMenuName());
  }

  changeTableRowToEditable(clickId?: string | null) {
    const $clickElement = $(`[data-id="${clickId}"]`);
    const childrenNodes = $clickElement.children;

    const isEditing = childrenNodes[0].getAttribute('contentEditAble');

    if (isEditing) {
      if (clickId) this.editOrder(clickId);
      alert('수정 완료');
    } else {
      for (let i = 0; i < childrenNodes.length; i++) {
        if (
          childrenNodes[i].getAttribute('data-title') === '수정하기' ||
          childrenNodes[i].getAttribute('data-title') === '삭제하기'
        )
          return;
        childrenNodes[i].setAttribute('contentEditAble', 'true');
      }
    }
  }

  removeTableRow(clickId?: string | null) {
    if (clickId) this.removeOrder(clickId);
  }

  renderOrderList() {
    this.$table.innerHTML =
      ORDER_TEMPLATE.orderTableRowHeader() +
      this.#orderList.map((order: Order, index: number) => ORDER_TEMPLATE.order(order, index + 1)).join('');
  }
}

export default OrderList;
