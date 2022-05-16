import Order from './Order';

import { DOM } from './constants';
import { $ } from './utils/dom';

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
      this.orderTableHeaderTemplate() +
      this.#orderList.map((order: Order) => this.orderTableRowTemplate(order)).join('');
  }

  orderTableRowTemplate(order: Order): string {
    const { id, menuName, size, shot, syrup, ice, temporature, wippedCream, extra, cup }: Order = order;
    return String.raw`
      <div class="table-row" data-id="${id}">
        <div class="cell" data-title="No">${id}</div>
        <div class="cell" data-title="메뉴명">${menuName}</div>
        <div class="cell" data-title="사이즈">${size}</div>
        <div class="cell" data-title="샷">${shot}</div>
        <div class="cell" data-title="시럽">${syrup}</div>
        <div class="cell" data-title="ICE/HOT">${temporature}</div>
        <div class="cell" data-title="얼음 종류">${ice}</div>
        <div class="cell" data-title="휘핑 크림">${wippedCream}</div>
        <div class="cell" data-title="엑스트라">${extra}</div>
        <div class="cell" data-title="컵">${cup}</div>
        <div class="cell" data-title="수정하기">
          <span class="edit-order"><i class="fa-solid fa-pen"></i></span>
        </div>
        <div class="cell" data-title="삭제하기">
          <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
        </div>
      </div>
    `;
  }

  orderTableHeaderTemplate(): string {
    return String.raw`
      <div class="table-row header">
        <div class="cell">No</div>
        <div class="cell">메뉴명</div>
        <div class="cell">사이즈</div>
        <div class="cell">샷</div>
        <div class="cell">시럽</div>
        <div class="cell">ICE/HOT</div>
        <div class="cell">얼음 종류</div>
        <div class="cell">휘핑 크림</div>
        <div class="cell">엑스트라</div>
        <div class="cell">컵</div>
        <div class="cell">수정하기</div>
        <div class="cell">삭제하기</div>
      </div>
    `;
  }
}

export default OrderList;
