import { OrderList } from '../domains';
import { OrderListView } from '../views';

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

  constructor(orderList: OrderList, orderListView: typeof OrderListView) {
    this.orderList = orderList;
    this.orderListView = orderListView;
  }

  public isClickOrderEditButton(target: HTMLElement): boolean {
    return target.closest('span')?.className === DOM.ORDER_EDIT_BUTTON_CLASS;
  }

  public isClickOrderRemoveButton(target: HTMLElement): boolean {
    return target.closest('span')?.className === DOM.ORDER_REMOVE_BUTTON_CLASS;
  }

  public isClickOrderAddButton(target: HTMLElement): boolean {
    return target.className === DOM.ORDER_BUTTON_CLASS;
  }

  public changeOrderToEditable(target: HTMLElement): void {
    const clickId = this.getClickOrderId(target);
    if (!clickId) throw new Error('클릭한 order의 id를 받지 못했습니다.');

    this.orderListView.changeTableRowToEditable(clickId);
  }

  public removeOrder(target: HTMLElement): void {
    const clickId = this.getClickOrderId(target);
    if (!clickId) throw new Error('클릭한 order의 id를 받지 못했습니다.');

    this.orderList.removeOrder(clickId);
    this.orderListView.renderOrderList(this.orderList.orderListDatas);
  }
  public addRandomOrder(): void {
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

  private getClickOrderId(target: HTMLElement): string | null | undefined {
    return target.closest(`.${DOM.ORDER_TABLE_ROW_CLASS}`)?.getAttribute('data-id');
  }
}
