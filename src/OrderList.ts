import Order from './Order';

import { DOM } from './constants';
import { $ } from './utils/dom';

import { IOrder } from './@types';

class OrderList {
  #orderList: IOrder[];

  $table: HTMLElement;

  constructor() {
    this.#orderList = [];

    this.$table = $(`#${DOM.ORDER_TABLE_ID}`);

    this.addEvents();
  }

  addEvents(): void {
    $(`.${DOM.ORDER_BUTTON_CLASS}`).addEventListener('click', () => {
      this.addOrder();
      this.renderOrderList();
    });

    $(`#${DOM.ORDER_TABLE_ID}`).addEventListener('click', this.handleTableClick.bind(this));
  }

  addOrder(): void {
    const newOrder = new Order();
    this.#orderList = [...this.#orderList, newOrder.getOrder()];
  }

  handleTableClick(event: Event) {
    const clickClassName = (event.target as Element).closest('span')?.className;
    const clickId = (event.target as Element).closest('.table-row')?.childNodes[1].textContent;

    if (clickClassName === DOM.ORDER_EDIT_BUTTON_CLASS) this.changeTableRowToEditable(clickId);
    if (clickClassName === DOM.ORDER_REMOVE_BUTTON_CLASS) this.removeTableRow(clickId);
  }

  changeTableRowToEditable(clickId: string | null | undefined) {
    if (clickId) {
      console.log('edit');
    }
  }

  removeTableRow(clickId: string | null | undefined) {
    if (clickId) {
      console.log('remove');
    }
  }

  renderOrderList() {
    this.$table.innerHTML =
      this.orderTableHeaderTemplate() +
      this.#orderList.map((order: IOrder) => this.orderTableRowTemplate(order)).join('');
  }

  orderTableRowTemplate(order: IOrder): string {
    const { id, menuName, size, shot, syrup, ice, temporature, wippedCream, extra, cup } = order;
    return String.raw`
      <div class="table-row">
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
