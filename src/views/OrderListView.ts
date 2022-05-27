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

  toggleContentEditable(clickId: string) {
    const $clickElement = $(`[data-id="${clickId}"]`);
    const childrenNodes = $clickElement.children;
    const EDIT_CONTENT_COUNT = childrenNodes.length - 2;

    for (let i = 1; i < EDIT_CONTENT_COUNT; i++) childrenNodes[i].toggleAttribute('contentEditAble');
  },
};
