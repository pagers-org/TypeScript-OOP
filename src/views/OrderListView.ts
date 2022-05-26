import { DOM } from '../constants';
import { ORDER_TEMPLATE } from '../templates';
import { $ } from '../utils/dom';

import type { OrderInterface } from '../@types';

export const OrderListView = {
  $table: $<HTMLTableElement>(`#${DOM.ORDER_TABLE_ID}`),

  renderOrderList(orderList: OrderInterface[]) {
    this.$table.innerHTML =
      ORDER_TEMPLATE.orderTableRowHeader() +
      orderList.map((order, index: number) => ORDER_TEMPLATE.order(order, index + 1)).join('');
  },

  changeTableRowToEditable(clickId: string) {
    const $clickElement = $(`[data-id="${clickId}"]`);
    const childrenNodes = $clickElement.children;

    for (let i = 0; i < childrenNodes.length; i++) {
      if (
        childrenNodes[i].getAttribute('data-title') === '수정하기' ||
        childrenNodes[i].getAttribute('data-title') === '삭제하기'
      )
        return;
      childrenNodes[i].setAttribute('contentEditAble', 'true');
    }
  },
};
