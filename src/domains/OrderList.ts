import { Order } from '../domains';

import { ORDER } from '../constants';
import { $ } from '../utils/dom';

import type {
  CupType,
  ExtraType,
  IceType,
  MenuNameType,
  MenuSizeType,
  OrderInterface,
  ShotType,
  SyrupType,
  TemporatureType,
  WippedCreamType,
} from '../@types';
import { pickRandomInArray, pickRandomUniqueId } from '../utils/random';

export class OrderList {
  private orderList: Order[];

  constructor() {
    this.orderList = [];
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

    this.orderList = [...this.orderList, newRandomOrder];
  }

  removeOrder(removeId: string | null) {
    this.orderList = this.orderList.filter(order => order.orderId !== removeId);
  }

  editOrder(editId: string) {
    const Order = this.orderList.find(order => order.orderId === editId);
    const newOrder = $(`[data-id="${editId}"]`).children;
    Array.from(newOrder).forEach(($el, index) => {
      if ($el.getAttribute('data-title') === '수정하기' || $el.getAttribute('data-title') === '삭제하기') return;
      Order?.updateOrder($el.textContent, index);
    });
  }

  get orderListDatas(): OrderInterface[] {
    return this.orderList.map(order => order.orderDatas);
  }

  get orderTotalLength(): number {
    return this.orderList.length;
  }

  get currentOrderMenuNames(): MenuNameType[] {
    return this.orderList.map(order => order.orderMenuName);
  }
}
