import { addCustomEventListener, dispatchCustomEvent } from '@/common';
import { EVENT } from '@/constant';
import { Component, Modal } from '@/components';
import { menuView } from './MenuView';
import { getBeverageById } from '@/cafe';
import { Order } from '@/domain';

const CLASS_NAME_NONE_ORDER = 'none-order';
const CLASS_NAME_SELECTED = 'selected';

const MSG_ALERT = '주문을 추가하세요';

export class Menu extends Component {
  private $form!: HTMLElement;
  private $buttons!: HTMLElement;

  protected bindElements(): void {
    this.$form = this.$container.querySelector('.coffee-add-area form') as HTMLElement;
    this.$buttons = this.$container.querySelector('.select-coffee-container .buttons') as HTMLElement;
  }

  protected mounted(): void {
    this.createMenuItems();
  }

  protected bindListeners(): void {
    addCustomEventListener(EVENT.ORDER_ADDED, e => {
      e.preventDefault();

      this.showAndActiveMenu(e.detail.order);
    });

    addCustomEventListener(EVENT.ORDER_REMOVED, e => {
      e.preventDefault();

      this.hideAndUnActiveMenu(e.detail.order);
    });
  }

  protected bindEvents(): void {
    this.$form.addEventListener('submit', event => {
      event.preventDefault();

      if (this.cafe.isOpenModal()) {
        return;
      }

      if (this.cafe.isEmptyOrder()) {
        return alert(MSG_ALERT);
      }

      const order = this.cafe.firstOrder();
      const beverage = getBeverageById(order.getBeverageId());

      (document.createElement('cafe-modal') as Modal).open(order, beverage);

      dispatchCustomEvent(EVENT.ORDER_SUBMIT);
    });
  }

  private createMenuItems(): void {
    this.cafe.menuItemElements().forEach($menuItem => {
      this.$buttons.appendChild($menuItem);
    });
  }

  private showAndActiveMenu(order: Order): void {
    this.show();
    this.activeMenu(order);
  }

  private hideAndUnActiveMenu(order: Order): void {
    if (this.cafe.isEmptyOrder()) {
      this.hide();
    }

    if (this.cafe.isEmptyOrderGroup(order.getBeverageId())) {
      this.unActiveMenu(order);
    }
  }

  private getMenuByOrder(order: Order): HTMLElement {
    return this.$container.querySelector(`[data-beverage-id="${order.getBeverageId()}"]`) as HTMLElement;
  }

  private activeMenu(order: Order): void {
    this.getMenuByOrder(order).classList.add(CLASS_NAME_SELECTED);
  }

  private unActiveMenu(order: Order): void {
    this.getMenuByOrder(order).classList.remove(CLASS_NAME_SELECTED);
  }

  private hide(): void {
    this.$container.classList.add(CLASS_NAME_NONE_ORDER);
  }

  private show(): void {
    this.$container.classList.remove(CLASS_NAME_NONE_ORDER);
  }

  protected view(): string {
    return menuView;
  }
}
