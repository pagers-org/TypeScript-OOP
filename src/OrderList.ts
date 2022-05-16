import Order from './Order';

import { DOM } from './constants';
import { $ } from './utils/dom';
import { ORDER_TEMPLATE } from './templates';

import type { MenuName } from './@types';

class OrderList {
  #orderList: Order[];

  $table: HTMLElement;

  constructor() {
    this.#orderList = [];

    this.$table = $(`#${DOM.ORDER_TABLE_ID}`);
  }

  addOrder() {
    const newOrder = new Order();
    this.#orderList = [...this.#orderList, newOrder];
    this.renderOrderList();
  }

  removeOrder(removeId: string) {
    this.#orderList = this.#orderList.filter(order => order.id !== removeId);
    this.renderOrderList();
    console.log(this.#orderList);
  }

  editOrder(editId: string) {
    const Order = this.#orderList.find(order => order.id === editId);
    const newOrder = $(`[data-id="${editId}"]`).children;
    Array.from(newOrder).forEach(($el, index) => {
      if ($el.getAttribute('data-title') === '수정하기' || $el.getAttribute('data-title') === '삭제하기') return;
      Order?.updateOrder($el.textContent, index);
    });
  }

  getOrderLength(): number {
    return this.#orderList.length;
  }

  getCurrentOrderMenuNames(): MenuName[] {
    return this.#orderList.map(order => order.menuName);
  }

  changeTableRowToEditable(clickId: string | null | undefined) {
    const $clickElement = $(`[data-id="${clickId}"]`);
    const childrenNodes = $clickElement.children;

    const isEdit = childrenNodes[0].getAttribute('contentEditAble');

    if (isEdit) {
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

  removeTableRow(clickId: string | null | undefined) {
    if (clickId) this.removeOrder(clickId);
  }

  renderOrderList() {
    this.$table.innerHTML =
      ORDER_TEMPLATE.orderTableRowHeader() +
      this.#orderList.map((order: Order, index: number) => ORDER_TEMPLATE.order(order, index + 1)).join('');
  }
}

export default OrderList;
