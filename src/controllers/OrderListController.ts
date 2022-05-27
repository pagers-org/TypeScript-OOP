import { OrderList } from '../domains';
import { KitchenView, OrderListView } from '../views';

import { DOM, ORDER } from '../constants';
import { pickRandomInArray, pickRandomUniqueId } from '../utils/random';

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

export class OrderListController {
  private readonly orderList;
  private readonly orderListView;
  private readonly kitchenView;

  constructor(orderList: OrderList, orderListView: typeof OrderListView, kitchenView: typeof KitchenView) {
    this.orderList = orderList;
    this.orderListView = orderListView;
    this.kitchenView = kitchenView;
  }

  public handleOrderListClickEvents(target: HTMLElement) {
    if (this.isClickOrderEditButton(target)) {
      if (this.isEditableMode(target)) this.editOrder(target);

      this.toggleContentEditable(target);

      console.log(this.orderList.orderListDatas);
    }

    if (this.isClickOrderRemoveButton(target)) {
      this.removeOrder(target);
      if (!this.orderList.orderTotalLength) this.kitchenView.close();
    }

    if (this.isClickOrderAddButton(target)) {
      if (!this.orderList.orderTotalLength) this.kitchenView.open();
      this.addRandomOrder();
    }
  }

  private isClickOrderEditButton(target: HTMLElement): boolean {
    return target.closest('span')?.className === DOM.ORDER_EDIT_BUTTON_CLASS;
  }

  private isClickOrderRemoveButton(target: HTMLElement): boolean {
    return target.closest('span')?.className === DOM.ORDER_REMOVE_BUTTON_CLASS;
  }

  private isClickOrderAddButton(target: HTMLElement): boolean {
    return target.className === DOM.ORDER_BUTTON_CLASS;
  }

  private isEditableMode(target: HTMLElement): boolean {
    return !!target.closest('.table-row')?.children[1].hasAttribute('contentEditAble');
  }

  private toggleContentEditable(target: HTMLElement): void {
    const clickId = this.getClickOrderId(target);
    this.orderListView.toggleContentEditable(clickId);
  }

  private removeOrder(target: HTMLElement): void {
    const clickId = this.getClickOrderId(target);
    this.orderList.removeOrder(clickId);
    this.orderListView.renderOrderList(this.orderList.orderListDatas);
  }

  private editOrder(target: HTMLElement): void {
    const $editedOrderRow = target.closest('.table-row');
    if (!$editedOrderRow) throw new Error('제일 가까운 곳에 .table-row 클래스 이름을 가진 요소가 없습니다.');

    this.orderList.editOrder(this.getClickOrderId(target));
  }

  private addRandomOrder(): void {
    this.orderList.addOrder({
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
    this.orderListView.renderOrderList(this.orderList.orderListDatas);
  }

  public getCurrentOrderMenuNames(): MenuNameType[] {
    return this.orderList.currentOrderMenuNames;
  }

  public getCurrentOrderLegnth(): number {
    return this.orderList.orderTotalLength;
  }

  private getClickOrderId(target: HTMLElement): string {
    const clickedOrder = target.closest(`.${DOM.ORDER_TABLE_ROW_CLASS}`);
    if (!clickedOrder)
      throw new Error(`가까운 곳에 ${DOM.ORDER_TABLE_ROW_CLASS}의 클래스 이름을 가진 요소가 없습니다.`);

    const clickedOrderId = clickedOrder.getAttribute('data-id');
    if (!clickedOrderId) throw new Error('클릭된 곳의 table row에 id값이 존재하지 않습니다.');

    return clickedOrderId;
  }
}
