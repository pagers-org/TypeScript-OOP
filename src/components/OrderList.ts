import { OrderList } from '../domains';

import { DOM } from '../constants';
import { $ } from '../utils/dom';
import { ORDER_TEMPLATE } from '../templates';
import { OrderInterface } from '../@types';

class OrderListComponent {
  private $table: HTMLTableElement;
  private orderList: OrderList;

  constructor() {
    this.$table = $<HTMLTableElement>(`#${DOM.ORDER_TABLE_ID}`);
    this.orderList = new OrderList();
  }

  changeTableRowToEditable(clickId?: string | null) {
    const $clickElement = $(`[data-id="${clickId}"]`);
    const childrenNodes = $clickElement.children;

    const isEditing = childrenNodes[0].getAttribute('contentEditAble');

    if (isEditing) {
      if (clickId) this.orderList.editOrder(clickId);
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

  renderOrderList() {
    this.$table.innerHTML =
      ORDER_TEMPLATE.orderTableRowHeader() +
      this.orderList.orderListDatas
        .map((order: OrderInterface, index: number) => ORDER_TEMPLATE.order(order, index + 1))
        .join('');
  }
}

export default OrderListComponent;
